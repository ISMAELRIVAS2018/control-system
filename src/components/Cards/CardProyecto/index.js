import {useEffect, useState } from "react";
import { useForm } from "hook/useForm";
import axios from "axios";
import Alert from "components/Alert";
import { getEstadosProyectos2 } from "services/index";

export default function CardProyecto() {
  const API = "http://127.0.0.1:8000/api/pro_estatus/lista";
  const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjI3MzYzNjgsImV4cCI6MTY2MjczOTk2OCwibmJmIjoxNjYyNzM2MzY4LCJqdGkiOiJYQ1hvQnBRZnY4cjZWZXFYIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ylnE6zDhZmRWngUpNLT52ivag1oSDCD1WojMyjBiU6M";

getEstadosProyectos2().then((datos)=>{
  console.log(datos);
});

  const proyectoInicial={
    pNombre: "",
    cliente: "",
    fechaIni: "",
    fechaFin: "",
    descripcion: "",
    pro_estatus_ID: "",
  }

  const validationsForm=(form)=>{
    let error ={};
    if(!form.pNombre.trim()){
      error.pNombre="* El campo nombre es requerido o no es valido"
    }
    if(!form.cliente.trim()){
      error.cliente="* El campo cliente es requerido o no es valido"
    }
    if(!form.descripcion.trim()){
      error.descripcion="* El campo descripcion es requerido o no es valido"
    }
    if(!form.fechaIni.trim()){
      error.fechaIni="* El campo Fecha Inicio es requerido o no es valido"
    }
    if(!form.fechaFin.trim()){
      error.fechaFin="* El campo Fecha Final es requerido o no es valido"
    }
    if(!form.pro_estatus_ID.trim()){
      error.pro_estatus_ID="* El campo Estado es requerido o no es valido"
    }
    return error;
  }

  const {
    form,
    error,
    loading,
    response,
    handleChange,
    handleBlur,
    handSubmit
  }=useForm(proyectoInicial,validationsForm);

  const[estados,setEstados]=useState([]);

  const getEstadosProyectos = async () => {
    const respuesta = await axios.get(API, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      setEstados(respuesta.data);
}

useEffect(() => {
  getEstadosProyectos();

}, []);

  return (
    <>
      <form onSubmit={handSubmit} className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Añadir Proyecto</h6>
            <input
              value="Guardar Proyecto"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="submit"
            />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
         {/*  <form> */}
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informacion del proyecto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="pNombre"
                    type="text"
                    className="mi-input border-0 px-3 py-3 placeholder-blueGray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Sistema de control de proyecto"
                    value={form.pNombre}
                    required
                  />
                  {error.pNombre && <p className="text-red-600">{error.pNombre}</p>}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Fecha de Inicio
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="fechaIni"
                    value={form.fechaIni}
                    type="date"
                    className="mi-input border-0 px-3 py-3 placeholder-blueGray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                    {error.fechaIni && <p className="text-red-600">{error.fechaIni}</p>}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Fecha de Final
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="fechaFin"
                    value={form.fechaFin}
                    type="date"
                    className="mi-input border-0 px-3 py-3 placeholder-blueGray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    required
                  />
                  {error.fechaFin && <p className="text-red-600">{error.fechaFin}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cliente
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="cliente"
                    value={form.cliente}
                    type="text"
                    className="mi-input border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Conexion"
                  />
                  {error.cliente && <p className="text-red-600">{error.cliente}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Estado
                  </label>
                  <select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="pro_estatus_ID"
                    className="mi-input border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Planificación" 
                  >
                    {estados.map((estados_id)=>(
                      <option key={estados_id.pro_estatusID} value={estados_id.pro_estatusID}>{estados_id.peNombre}</option>
                    ))}
                  </select>
                  {error.pro_estatus_ID && <p className="text-red-600">{error.pro_estatus_ID}</p>}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Descripción
                  </label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="descripcion"
                    type="text"
                    value={form.descripcion}
                    className="mi-input border-0 px-3 py-3 placeholder-blueGray text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Sistema para manejar todos los proyectos que desarrolla y mantiene la empres de Conexion"
                    rows="4"
                    required
                  ></textarea>
                   {error.descripcion && <p className="text-red-600">{error.descripcion}</p>}
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                {loading && <Alert color={false}/>}
                {response && <Alert color={true}/>}
              </div>
            </div>
          {/* </form> */}
        </div>
      </form>
    </>
  );
}
