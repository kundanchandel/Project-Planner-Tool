import React, { useEffect } from "react";
import axios from "../../services/Axios";

export default function Menu() {
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("/dish");
    console.log(response,'hello');
  };
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
