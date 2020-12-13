import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import axios from "../../services/Axios";
import { Link } from "react-router-dom";
import { BiFoodMenu } from "react-icons/bi";
import "./home.css";
export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    console.log("hellooo");
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("/restaurant");
    // console.log(response);
    if (response.data) {
      setRestaurants(response.data);
    }
  };
  return (
    <div>
      <div className="tableHeading">Restaurants</div>
      <TableContainer style={{ color: "white", marginTop:"25px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <p className="tHead">Restaurant Name</p>
              </TableCell>
              <TableCell align="center">
                <p className="tHead">Contact No.</p>
              </TableCell>
              <TableCell align="center">
                <p className="tHead">E-mail ID</p>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.name}>
                <TableCell align="center" component="th" scope="row">
                  <p className="tData">{restaurant.username}</p>
                </TableCell>
                <TableCell align="center">
                  <p className="tData">{restaurant.phoneno}</p>
                </TableCell>
                <TableCell align="center">
                  <p className="tData"> {restaurant.email}</p>
                </TableCell>
                <TableCell align="center">
                  {
                    <Link
                      className="viewMenuBtn"
                      to={`/rest/${restaurant._id}`}
                    >
                      {" "}
                      View_Menu
                    </Link>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
