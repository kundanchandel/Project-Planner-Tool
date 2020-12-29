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
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Moment from 'react-moment';
import axios from "../../services/Axios";

const handleMarkPaid = async (orderId) => {
  const confirm = window.confirm("Are you sure, you want to make it as paid!");
  if (confirm) {
    const response = await axios.put(`order/${orderId}`, { isPaid: true });
    window.location.reload();
  }
};
const Row = (props) => {
  const { order } = props;
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
        <TableCell>{order.tableNo}</TableCell>
        <TableCell>₹{order.orderTotal}</TableCell>
        <TableCell><Moment  format="DD-MM-YYYY HH:mm dddd">{order.updatedAt}</Moment>
        </TableCell>
        {console.log(order.isPaid)}
        {order.isPaid == false && (
          <TableCell onClick={() => handleMarkPaid(order._id)}>
            <Button variant="outlined" color="secondary">
              Mark as paid!
            </Button>
          </TableCell>
        )}
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
                    <TableCell style={{ color: "white" }}>Price</TableCell>
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
                        <TableCell>₹{dish.orderDishes.price}</TableCell>
                        <TableCell>{dish.qnt}</TableCell>
                        <TableCell>₹{dish.total}</TableCell>
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
  const [unFilteredData, setUnFilteredData] = useState([]);
  const [value, setValue] = React.useState("unPaid");

  const handleFilter = (status) => {
    if (status == "unPaid" && value !== "unPaid") {
      var tempData = unFilteredData.filter((order) => {
        return !order.isPaid;
      });
      setData(tempData);
      setValue("unPaid");
    } else if (status == "paid" && value !== "paid") {
      var tempData = unFilteredData.filter((order) => {
        return order.isPaid;
      });
      setData(tempData);
      setValue("paid");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get("/orders");
    setUnFilteredData(response.data);
    var tempData = response.data.filter((order) => {
      return !order.isPaid;
    });
    setData(tempData);
    //     console.log(data);
  };
  return (
    <>
      <Paper className="m-2">
        <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab
            label="Current Orders"
            onClick={() => {
              handleFilter("unPaid");
            }}
            style={
              value == "unPaid" ? { borderBottom: "2px solid #3f51b5" } : {}
            }
          />
          <Tab
            label="Past Orders"
            onClick={() => {
              handleFilter("paid");
            }}
            style={value == "paid" ? { borderBottom: "2px solid #3f51b5" } : {}}
          />
        </Tabs>
      </Paper>
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
                Date
              </TableCell>
              {value == "unPaid" && (
                <TableCell
                  style={{ color: "white", fontWeight: "bolder" }}
                ></TableCell>
              )}
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
    </>
  );
}
