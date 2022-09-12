import {useState} from 'react'
import axios from "axios";

const API = "http://127.0.0.1:8000/api/proyecto/agregar";
  
const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjI5OTgxNzUsImV4cCI6MTY2MzAwMTc3NSwibmJmIjoxNjYyOTk4MTc1LCJqdGkiOiI4Vm5wckdJUFBRcTY5a1RoIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.gZRgePGc9hF9nh14Aym1cMchM6EtxDEmCtwsSttXRNQ"

export const useForm=(initialFrom,validateForm)=> {
   const [form, setForm] = useState(initialFrom);
   const [error, setError] = useState({});
   const [loading, setLoading] = useState(false);
   const [response, setResponse] = useState(null);

   /* Manejo del evento onChange de los inputs */
   const handleChange=(event)=>{
    const {name, value}=event.target;
    setForm({
      ...form,
      [name]:value
    });
  }
 
     /* Manejo de los errores de los inputs (se activa al quitar el foco de algun input)*/
   const handleBlur=(event)=>{
    handleChange(event);
    setError(validateForm(form));
   }

   /* Al darle "Crear Proyecto" activa esta funcion que llama a la funcion para enviar el proyecto*/
   const handSubmit=(event)=>{
    event.preventDefault();
    setError(validateForm(form));
    if(Object.keys(error).length===0){
      setLoading(true);
      const respuesta =guardarProyecto();
      respuesta.then((res)=>{
        if(res.status===200){
          setLoading(false);
          setResponse(true);
          setTimeout(() => {
            setResponse(false);
          }, 6000);
        }
      });
    }
    else{
      return;
    }
   }

   /* Funcion que envia el proyecto a la API */
   const guardarProyecto=async ()=>{
    try{
      const respuesta = await axios.post(
        API,
        JSON.stringify(form),
        {
          headers: {
            "Content-type": "application/json",
            authorization: `bearer ${token}`,
          }
        }
      );
      return respuesta
    }
    catch(error){ 
      console.log(error.response.data);
    }
  } 

   return {
    form,
    error,
    loading,
    response,
    handleChange,
    handleBlur,
    handSubmit
   }
}
  