import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MdDelete } from "react-icons/md";
import Button from "@material-ui/core/Button";
import axios from "../../services/Axios";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState({});
  useEffect(() => {
    getData();
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      setCart(cart);
      var total = 0;
      cart.map((item) => {
        total = total + item.quantity * item.dish.price;
      });
      setTotal(total);
    }
  }, []);

  const getData = async () => {
    const response = await axios.get("/order");
    if (response.data) {
      setOrders(response.data);
    }
  };
  const handleRemoveFromCart = (idx) => {
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  const handlePlaceOrder = async () => {
    const restId = localStorage.getItem("restId");
    var dish = [];
    cart.forEach((item) => {
      dish.push({ _id: item.dish._id, quantity: item.quantity });
    });
    const response = await axios.post(`/restaurant/${restId}/order`, { dish });
    console.log(response);
    if (response) {
      localStorage.setItem("cart", "");
      window.location.reload();
    }
  };
  return (
    <div>
      {cart.length > 0 && (
        <div>
          <p className="tableHeading">Wish List</p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <p className="tHead"> Name</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tHead">Price</p>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="tHead">Quantity</p>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="tHead">Total</p>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, idx) => {
                  return (
                    <TableRow>
                      <TableCell align="center">
                        <p className="tData">{item.dish.name}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData">₹{item.dish.price}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData">{item.quantity}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData">
                        ₹{item.dish.price * parseInt(item.quantity)}
                        </p>
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleRemoveFromCart(idx)}
                      >
                        <p className="tData">{<MdDelete />}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              justifyContent: "flex-end",
              color: "white",
            }}
          >
            <p>Total Price: ₹{total}/- </p>
            <button className="orderBtn" onClick={handlePlaceOrder}>
              <p>Place Order</p>
            </button>
          </div>
        </div>
      )}
      {orders.dish ? (
        <div>
          <p className="tableHeading">Orders</p>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <p className="tHead">Name</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tHead">Price per plate</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tHead">Quantity</p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="tHead"> Dish Total</p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.dish.map((dish) => {
                  return (
                    <TableRow key={dish._id}>
                      <TableCell align="center">
                        <p className="tData">{dish.orderDishes.name}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData"> ₹{dish.orderDishes.price}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData">{dish.qnt}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="tData">₹{dish.total}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="orderTotal">
            <div>Order total: ₹{orders.orderTotal}/-</div>
          </div>
        </div>
      ) : (
        <p className="tableHeading">No Orders</p>
      )}
    </div>
  );
}
