import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "./data";

export default function CardTable() {
  const baseUrl = "http://127.0.0.1:8000/api/proyecto/lista/1";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjE5ODA5NzUsImV4cCI6MTY2MTk4NDU3NSwibmJmIjoxNjYxOTgwOTc1LCJqdGkiOiJVSmdrdWIyZ2VSQlg4RGhiIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KPDPeVrRUyIamTQ_jYXdl-006FqjLLpSS5X8iUWgx9w";

  const [infoUsertableData, setInfoUserTableData] = useState([]);

  const getDataTable = async () => {
    try {
      const res = await axios.get(baseUrl, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });

      const data = res.data.map((dat) => ({
        id: dat.proyectoID,
        pNombre: dat.pNombre,
        descripcion: dat.descripcion,
      }));



      setInfoUserTableData({
        columns,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTable();
  }, []);


  return (
    <>
      <div className="main">
        <DataTableExtensions {...infoUsertableData}>
          <DataTable
            columns={columns}
            data={infoUsertableData}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
    </>
  );
}
