import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "../../services/Axios";
import { BsFillTrashFill } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

import "./QR.css";
export default function QR() {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState(1);
  const [restId, setRestId] = useState("");

  const downloadQR = (tableId) => {
    const canvas = document.getElementById(`qrCode${tableId}`);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrCode${tableId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("/");
    let restId = response.data._id;
    let tables = response.data.tables;
    setTables(tables);
    setRestId(restId);
  };

  const handleNewTableChange = (value) => {
    if (value > 0) {
      setNewTable(value);
    }
  };

  const addTable = async () => {
    const response = await axios.post("/table", { tableNo: newTable });
    const tables = response.data.tables;
    setTables(tables);
    setNewTable(newTable + 1);
  };

  const handelTableDelete = async (tableId) => {
    const confirm = window.confirm("Delete this table!");
    console.log(confirm);
    if (confirm) {
      const response = await axios.delete(`/table/${tableId}`);
      const tables = response.data.tables;
      setTables(tables);
    }
  };
  return (
    <div className="qrContainer">
      {tables.map((tId) => {
        return (
          <div key={tId}>
            <QRCode
              value={`http://localhost:3000/rest/${restId}/${tId}`}
              id={`qrCode${tId}`}
              size={290}
              includeMargin={true}
            />
            <div className="qrInfo">
              <div>Table No: {tId}</div>
              <div className="qrActions">
                <button
                  onClick={() => {
                    downloadQR(tId);
                  }}
                >
                  <FaDownload />
                </button>
                <button
                  className="qrDelete"
                  onClick={() => {
                    handelTableDelete(tId);
                  }}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <input
          type="number"
          value={newTable}
          onChange={(e) => {
            handleNewTableChange(parseInt(e.target.value));
          }}
        />
        <button onClick={addTable} disabled={tables.includes(newTable)}>
          Add New Table
        </button>
      </div>
    </div>
  );
}
