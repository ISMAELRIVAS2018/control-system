//import axios from "axios";
//import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns, data } from "./data";

export default function CardTable() {
  /*
  const baseUrl = "http://127.0.0.1:8000/";
 
  const [tableData, setTableData] = useState({
    columns,
    data,
  });
/* 
  const getDataTable = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(baseUrl);
      console.log(res.data);
      setTableData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTable();
  }, []); */

  const tableData = {
    columns,
    data,
  };
  return (
    <>
      <div className="main">
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={data}
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
