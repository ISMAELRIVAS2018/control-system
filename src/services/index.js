import axios from "axios";

const listaEstados = "http://127.0.0.1:8000/api/pro_estatus/lista";
const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjI3MzYzNjgsImV4cCI6MTY2MjczOTk2OCwibmJmIjoxNjYyNzM2MzY4LCJqdGkiOiJYQ1hvQnBRZnY4cjZWZXFYIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.ylnE6zDhZmRWngUpNLT52ivag1oSDCD1WojMyjBiU6M";

let estados=[];

export const getEstadosProyectos2 = async () => {
    const respuesta = await axios.get(listaEstados, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      estados=respuesta.data;
      return estados;
}

