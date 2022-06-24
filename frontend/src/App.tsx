import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import { useGetProductsQuery } from "./redux";

function App() {
  const [orders, setOrders] = useState<ProductInterface[]>();
  const [orderItems, setOrderItems] = useState<ProductInterface[]>([]);
  const orderId = useRef(null);


  const {data: products, isSuccess} = useGetProductsQuery();

  console.log(products);

  function addToCart(product: ProductInterface) {
    const cartItems = [...orderItems];
    let alreadyInCart = false;
    [...orderItems].forEach((item) => {
      if (item.code === product.code) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setOrderItems(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function removeFromCart(product: ProductInterface) {
    const cartItems = [...orderItems];
    setOrderItems(cartItems.filter((item) => item.code !== product.code));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item.code !== product.code))
    );
  }

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
            {isSuccess && products.map((product: ProductInterface, index: number) => {
              return (
                <div key={index}>
                  <p>{product.name}</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
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
              {orderItems.map((item, index) => {
                console.log(item.count);

                return (
                  <div className="flex flex-row" key={index}>
                    <div>{item.name}</div>
                    <span> x {item.count}</span>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => removeFromCart(item)}
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
