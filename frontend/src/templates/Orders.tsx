import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../services/OrderApi";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { OrderInterface } from "../lib/interfaces/OrderInterface";
import { LotInterface } from "../lib/interfaces/LotInterface";

function Orders() {
  const { data: orders, isSuccess } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const updateHandler = async (
    _id: string,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const status = e.target.value as string;

    await updateOrder({ _id, status } as Partial<OrderInterface> &
      Pick<OrderInterface, "_id">);
  };

  return (
    <div className="w-full flex flex-col">
      {isSuccess &&
        orders?.map((order: OrderInterface, index) => {
          return (
            <div
              key={index}
              className="m-8 space-y-4 border-8 border-indigo-600 p-4 cursor-pointer"
            >
              <p>
                Order number
                <span className="font-bold"> {order._id}</span>
              </p>
              {order.orderItems.map((item, index) => {
                return (
                  <>
                    <p className="underline">{item.name}</p>
                    <p>Quantity : {item.quantity}</p>
                    <div className="flex flex-row">
                      {item.lots.map((lot: LotInterface, index) => {
                        return (
                          <div key={index} className="">
                            <p>
                              - Lot :{" "}
                              <span className="font-bold">{lot.name} </span>
                              Stock Quantity{" "}
                              <span className="font-bold">{lot.quantity} </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
              <p>
                Order date :{" "}
                <span className="font-bold">
                  {" "}
                  {moment(order.date).format("dddd, MMMM Do YYYY")}
                </span>
              </p>

              <form action="">
                <label htmlFor="status">Order status:</label>
                <select
                  name="status"
                  id="status"
                  onChange={(e) => updateHandler(order._id, e)}
                >
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Pending Received">Pending receive</option>
                  <option value="Received">Received</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </form>
            </div>
          );
        })}
      <h2>Table Coming soon</h2>
      <table className="table table-hover">
        {/* <thead>
          <tr>
            <th scope="col">Purchase Order</th>
            <th scope="col">Line number</th>
            <th scope="col">Item</th>
            <th scope="col">Line quantity</th>
            <th scope="col">Inventory Lot Number </th>
            <th scope="col">Lot Number Quantity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            orders.map((order, index) => {
              return (
                <tr className="table-success" key={index}>
                  <td>{order._id}</td>
                  <td>{index + 1}</td>
                  {order.orderItems.map((item, index) => {
                    return (
                      <>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        {item.lots.map((lot: LotInterface, index) => {
                          return (
                            <>
                              <td>{lot.name}</td>
                              <td>{lot.quantity}</td>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                  <td>
                    <form>
                      <select
                        name="status"
                        id="status"
                        onChange={(e) => updateHandler(order._id, e)}
                      >
                        <option value="Pending Approval">
                          Pending Approval
                        </option>
                        <option value="Pending Received">
                          Pending receive
                        </option>
                        <option value="Received">Received</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </form>
                  </td>
                </tr>
              );
            })}

           <tr className="table-danger">
            <th scope="row">Danger</th>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
          </tr> 
        </tbody> */}
      </table>
    </div>
  );
}

export default Orders;
function orderItems(orderItems: any) {
  throw new Error("Function not implemented.");
}
