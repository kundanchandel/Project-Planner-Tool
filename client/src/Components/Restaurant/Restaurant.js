import React, { useState, useEffect } from "react";
import axios from "../../services/Axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
export default function Restaurant(props) {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const getData = async () => {
    const id = props.match.params.id;
    const response = await axios.get(`/restaurant/${id}/menu`);
    if (response.data) {
      setMenu(response.data.menu);
      setName(response.data.username);
    }
  };
  useState(() => {
    getData();
  }, []);

  return (
    <div>
      <div>{name}</div>
      <TableContainer>
        <Table aria-label="simple table">
          {menu.length>0 && (
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Decsription</TableCell>
                <TableCell>Categroy</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {menu &&
              menu.map((dish) => (
                <TableRow key={dish.name}>
                  <TableCell component="th" scope="row">
                    {dish.name}
                  </TableCell>
                  <TableCell>{dish.desc}</TableCell>
                  <TableCell>{dish.category}</TableCell>
                  <TableCell>{dish.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {menu.length == 0 ? <p>No Menu Item</p> : ""}
    </div>
  );
}
