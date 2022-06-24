import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import { cartSelector, useGetProductsQuery } from "./redux";

function App() {
  const { data: products, isSuccess } = useGetProductsQuery();

  const orderItems = useSelector(cartSelector);

  console.log(orderItems);

  const dispatch = useDispatch();


  function createOrder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const unique_id = uuid();
    const order = {
      date: new Date(),
      id: unique_id,
      items: orderItems,
      status: "Pending Approval",
    };

    console.log(order);
  }

  return (
    <div className="grid-container">
      <Header />
      <h1>ProductList</h1>
      <div className="content flex flex-row">
        <div className="main w-3/4">
          <div className="products grid grid-cols-3 gap-x-8 gap-y-4">
            {isSuccess &&
              products.map((product: ProductInterface, index: number) => {
                return (
                  <div key={index}>
                    <p>{product.name}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        dispatch({
                          type: "cart/addToCart",
                          payload: product,
                        })
                      }
                    >
                      Add to order
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="sidebar w-1/4">
          {orderItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <>
              <div> You have {orderItems.length} elements in your order</div>
              {orderItems.map((item: ProductInterface, index: number) => {
                return (
                  <div className="flex flex-row" key={index}>
                    <div>{item.name}</div>
                    <span> x {item.count}</span>
                    <button
                      type="button"
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
              <button
                type="button"
                className="btn btn-warning"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  createOrder(e)
                }
              >
                Pass your order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
