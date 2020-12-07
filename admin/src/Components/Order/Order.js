import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import axios from "../../services/Axios";

const Row = (props) => {
  const order = props.order;
  const [open, setOpen] = useState(false);
  //   console.log("hello");
  return (
    <React.Fragment>
      <TableRow style={{ borderBottom: "unset" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.orderTotal}</TableCell>
        <TableCell>{order.isPaid ? "True" : "False"}</TableCell>
        <TableCell>{order.updatedAt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          //   style={open ? { border: "1px solid #3f51b5" } : {}}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ backgroundColor: "#e5ebea" }}
          >
            <Box>
              {/* <Typography
                variant="h5"
                component="div"
                style={{
                  textAlign: "center",
                  //   backgroundColor: "#3f51b5",
                  fontWeight: "bolder",
                  //   color: "white",
                  //   borderBottom: "1px solid white",
                }}
              >
                Order Details
              </Typography> */}
              <Table size="small">
                <TableHead
                  style={{
                    backgroundColor: "#b098a4",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <TableRow>
                    <TableCell />
                    <TableCell style={{ color: "white" }}>Name</TableCell>
                    <TableCell style={{ color: "white" }}>Category</TableCell>
                    <TableCell style={{ color: "white" }}> Price</TableCell>
                    <TableCell style={{ color: "white" }}>Quantity</TableCell>
                    <TableCell style={{ color: "white" }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.dish.map((dish) => {
                    return (
                      <TableRow>
                        <TableCell />
                        <TableCell>{dish.orderDishes.name}</TableCell>
                        <TableCell>{dish.orderDishes.category}</TableCell>
                        <TableCell>{dish.orderDishes.price}</TableCell>
                        <TableCell>{dish.qnt}</TableCell>
                        <TableCell>{dish.total}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function Order() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("/orders");
    setData(response.data);
    //     console.log(data);
  };
  return (
    <TableContainer class="container-fluid">
      <Table aria-label="collapsible table">
        <TableHead
          style={{
            backgroundColor: "#27272b",
          }}
        >
          <TableRow>
            <TableCell
              style={{ color: "white", fontWeight: "bolder" }}
            ></TableCell>
            <TableCell style={{ color: "white", fontWeight: "bolder" }}>
              Table No
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bolder" }}>
              Order Total
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bolder" }}>
              isPAid
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bolder" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length &&
            data.map((order) => {
              //       console.log(order, " hello");
              return <Row order={order} />;
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
