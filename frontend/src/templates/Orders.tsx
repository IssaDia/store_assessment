import { useGetOrdersQuery, useUpdateOrderMutation } from "../services/OrderApi";
import  moment  from "moment";
import { ChangeEvent } from "react";
import { OrderInterface } from "../lib/interfaces/OrderInterface";
import { Status } from '../lib/enums/Order';

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

   await updateOrder({ _id, status } as Partial<OrderInterface> & Pick<OrderInterface, "_id">);
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
    </div>
  );
}

export default Orders;
