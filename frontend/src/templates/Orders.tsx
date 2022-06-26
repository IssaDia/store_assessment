import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "../services/OrderApi";
import moment from "moment";
import { ChangeEvent } from "react";
import { OrderInterface } from "../lib/interfaces/OrderInterface";
import { Status } from "../lib/enums/Order";

function Orders() {
  const { data: orders, isSuccess } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  const updateHandler = async (
    _id: string,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log(e.target.value);
    const status = e.target.value as string;

    await updateOrder({ _id, status } as Partial<OrderInterface> &
      Pick<OrderInterface, "_id">);
  };

  return (
    <div className="w-full flex flex-col">
      {isSuccess &&
        orders?.map((order: OrderInterface, index) => {
          return (
            <div key={index}>
              <p>{moment(order.date).format("dddd, MMMM Do YYYY")}</p>
              <p>{order.status}</p>
              <form action="">
                <label htmlFor="status">Define a status:</label>
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
      <table className="table table-hover">
        <thead>
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
          <tr className="table-success">
            {isSuccess &&
              orders.map((order, index) => {
                return (
                  <>
                    <td>{order._id}</td>
                    <td>{index + 1}</td>
                  </>
                );
              })}
          </tr>
          {/* <tr className="table-danger">
            <th scope="row">Danger</th>
            <td>Column content</td>
            <td>Column content</td>
            <td>Column content</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
