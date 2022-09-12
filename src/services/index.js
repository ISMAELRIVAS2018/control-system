import axios from "axios";

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjI5OTgxNzUsImV4cCI6MTY2MzAwMTc3NSwibmJmIjoxNjYyOTk4MTc1LCJqdGkiOiI4Vm5wckdJUFBRcTY5a1RoIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.gZRgePGc9hF9nh14Aym1cMchM6EtxDEmCtwsSttXRNQ ";

let estados=[];

export const getEstadosProyectos = async (API) => {
  try{
    const respuesta = await axios.get(API, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      estados=respuesta.data;
      return estados;
  }
  catch(error){
    console.log(error.response.data.message);
  }
}
