
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Popconfirm, Button, Space, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
/* import "react-data-table-component-extensions/dist/index.css";  */

export default function CardTable() {
  const baseUrl = "http://127.0.0.1:8000/api/proyecto/lista/1";
  const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE2NjI3MzkwNjAsImV4cCI6MTY2Mjc0MjY2MCwibmJmIjoxNjYyNzM5MDYwLCJqdGkiOiI5bmF2TXZuSmdKMzdOUU90Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ._YzWsjHC4i6vnT_1JJsQHJfawyPgJnJ7ixwLHx4W2qQ";
  const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editRowKey, setEditRowKey] = useState("");
    const [sortedInfo, setSortedInfo] = useState({});
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [searchColText, setSearchColText] = useState("");
    const [searchedCol, setSearchedCol] = useState("");
    let [filteredData] = useState();

      useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
        setLoading(true);
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          "Content-type": "application/json",
          authorization: `bearer ${token}`,
        },
      });
      setGridData(response.data);
      setLoading(false);
     
    
  } catch (error) {
    console.log("error", error);
  }
};

    const dataWithAge = gridData.map((item) => ({
      ...item,
      age: Math.floor(Math.random() * 6) + 20,
    }));
  
    const modifiedData = dataWithAge.map(({ body, ...item }) => ({
      ...item,
      key: item.id,
      message: isEmpty(body) ? item.message : body,
    }));
  
    console.log("modifiedData", modifiedData);
  
    const handleDelete = (value) => {
      const dataSource = [...modifiedData];
      const filteredData = dataSource.filter((item) => item.id !== value.id);
      setGridData(filteredData);
    };
  
    const isEditing = (record) => {
      return record.key === editRowKey;
    };
  
    const cancel = () => {
      setEditRowKey("");
    };
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...modifiedData];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setGridData(newData);
          setEditRowKey("");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const edit = (record) => {
      form.setFieldsValue({
        name: "",
        email: "",
        message: "",
        ...record,
      });
      setEditRowKey(record.key);
    };
  
    const handleChange = (...sorter) => {
      // console.log("sorter", sorter);
      const { order, field } = sorter[2];
      setSortedInfo({ columnKey: field, order });
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 0, display: "block" }}
          />
  
          <Space style={{marginTop: 4}}>
            <Button
              type="primary"
              onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleResetCol(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      render: (text) =>
        searchedCol === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding:0 }}
            searchWords={[searchColText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
  
    const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchColText(selectedKeys[0]);
      setSearchedCol(dataIndex);
    };
  
    const handleResetCol = (clearFilters) => {
      clearFilters();
      setSearchColText("");
    };
  
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "NaproyectoIDme",
        dataIndex: "name",
        align: "center",
        editiTable: "true",
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ...getColumnSearchProps("name"),
      },
      {
        title: "pNombre",
        dataIndex: "email",
        align: "center",
        editiTable: "true",
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
        ...getColumnSearchProps("email"),
      },
      {
        title: "cliente",
        dataIndex: "age",
        align: "center",
        editiTable: "false",
        sorter: (a, b) => a.age.length - b.age.length,
        sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
      },
      {
        title: "fechaIni",
        dataIndex: "message",
        align: "center",
        editiTable: "true",
        sorter: (a, b) => a.message.length - b.message.length,
        sortOrder: sortedInfo.columnKey === "message" && sortedInfo.order,
        ...getColumnSearchProps("message"),
        
      },
      {
        title: "descripcion",
        dataIndex: "action",
        align: "center",
        render: (_, record) => {
          const editable = isEditing(record);
          return modifiedData.length >= 1 ? (
            <Space>
              <Popconfirm
                title="Are you sure want to dele ?"
                onConfirm={() => handleDelete(record)}
              >
                <Button danger type="primary" disabled={editable}>
                  Delete
                </Button>
              </Popconfirm>
              {editable ? (
                <span>
                  <Space size="middle">
                    <Button
                      onClick={() => save(record.key)}
                      type="primary"
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Popconfirm title="Are sure to cancel ?" onConfirm={cancel}>
                      <Button>Cancel</Button>
                    </Popconfirm>
                  </Space>
                </span>
              ) : (
                <Button onClick={() => edit(record)} type="primary">
                  Edit
                </Button>
              )}
            </Space>
          ) : null;
        },
      },
    ];
  
    const mergedColumns = columns.map((col) => {
      if (!col.editiTable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
  
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      record,
      children,
      ...restProps
    }) => {
      const input = <Input />;
  
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `please input some value in ${title} field`,
                },
              ]}
            >
              {input}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
    const reset = () => {
      setSortedInfo({});
      setSearchText("");
      loadData();
    };
  
    const handleInputChange = (e) => {
      setSearchText(e.target.value);
      if (e.target.value === "") {
        loadData();
      }
    };
  
    const globalSearch = () => {
      filteredData = modifiedData.filter((value) => {
        return (
          value.name.toLowerCase().includes(searchText.toLowerCase()) ||
          value.email.toLowerCase().includes(searchText.toLowerCase()) ||
          value.message.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setGridData(filteredData);
    };
  
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Enter Search Text"
            onChange={handleInputChange}
            type="text"
            allowClear
            value={searchText}
          />
          <Button onClick={globalSearch} type="primary">
            search
          </Button>
          <Button onClick={reset}>Reset</Button>
        </Space>
        <Form form={form} component={false}>
          <Table
            columns={mergedColumns}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={
              filteredData && filteredData.length ? filteredData : modifiedData
            }
            bordered
            loading={loading}
            onChange={handleChange}
          />
        </Form>
      </div>
    );

  };
