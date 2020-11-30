import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "../../services/Axios";
import { Link } from "react-router-dom";
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("/restaurant");

    if (response.data) {
      setRestaurants(response.data);
    }
  };
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.name}>
                <TableCell component="th" scope="row">
                  {restaurant.username}
                </TableCell>
                <TableCell>{restaurant.phoneno}</TableCell>
                <TableCell>{restaurant.email}</TableCell>
                <TableCell>
                  {<Link to={`/rest/${restaurant._id}`}> -></Link>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
