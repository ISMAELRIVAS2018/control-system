import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "./data";

export default function CardTable() {
  const baseUrl = "https://127.0.0.1:49160/api/proyecto/lista/1";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjQ5MTYwL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNjYyNjU5ODQ3LCJleHAiOjE2NjI3NDYyNDcsIm5iZiI6MTY2MjY1OTg0NywianRpIjoiY1hxUFVOcDJoemFHN0lNRiIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.NLaoOIg4wjphsbtRa3zi4DRQsVqPinVufWzPRmDqScg";

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
