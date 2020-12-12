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
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Restaurant Name
                </p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Contact No.
                </p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  E-mail ID
                </p>
              </TableCell>
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
                  {
                    <Link
                      to={`/rest/${restaurant._id}`}
                      style={{
                        textDecoration: "none",
                        border: "1px solid #3f51b5",
                        borderRadius: "5px",
                        padding: "5px",
                        backgroundColor: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      View Menu
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
