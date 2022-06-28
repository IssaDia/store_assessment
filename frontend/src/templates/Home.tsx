import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Status } from "../lib/enums/Order";
import { OrderInterface } from "../lib/interfaces/OrderInterface";
import { ItemInterface } from "../lib/interfaces/ItemInterface";
import { cartSelector } from "../redux";
import { useAddOrderMutation } from "../services/OrderApi";
import { useGetItemsQuery } from "../services/ItemsApi";
import { useState } from "react";
import { dummyItems } from "../lib/data/DummyItems";

function Home() {
  const { data: items, isSuccess } = useGetItemsQuery();

  const orderedItems = useSelector(cartSelector);

  const dispatch = useDispatch();

  const [addOrder] = useAddOrderMutation();
  const addHandler = async () => {
    const order: OrderInterface = {
      _id: uuidv4(),
      date: new Date(),
      orderItems: orderedItems,
      status: Status.PendingA,
    };

    await addOrder(order);
    dispatch({
      type: "order/addToOrder",
      payload: order,
    });
    localStorage.setItem("cartItems", "");
  };
  return (
    <>
      <div className="flex justify-center my-4">
        <h1>Items List</h1>
      </div>
      <div className="content flex flex-row">
        <div className="main w-3/4">
          <div className="items grid grid-cols-3 gap-x-8 gap-y-4">
            {isSuccess &&
              items.map((item: ItemInterface, index: number) => {
                return (
                  <div key={index}>
                    <div className="flex items-center justify-center">
                      <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
                        <div className="p-5">
                          <p className="text-medium mb-5 text-gray-700">
                            {item.name}
                          </p>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "cart/addToCart",
                                payload: item,
                              })
                            }
                            className="w-full btn btn-primary"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="sidebar w-1/4">
          {orderedItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <>
              <div> You have {orderedItems.length} elements in your order</div>
              {orderedItems.map((item: ItemInterface, index: number) => {
                return (
                  <div className="flex flex-row my-4" key={index}>
                    <p>{item.name}</p>
                    <span className="mr-4"> x {item.quantity}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        dispatch({
                          type: "cart/removeFromCart",
                          payload: item.code,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <button className="btn btn-warning" onClick={addHandler}>
                Pass your order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
