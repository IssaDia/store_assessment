import { useEffect, useState } from "react";
import Header from "./components/Header";
import { products } from "../src/lib/data/Products";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";

function App() {
  const [productList, setProductList] = useState<ProductInterface[]>(products);
  const [orderItems, setOrderItems] = useState<ProductInterface[]>([]);

  function addToCart(product: ProductInterface) {
    let alreadyInCart = false;
    [...orderItems].forEach((item) => {
      if (item.code === product.code) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      setOrderItems([...orderItems, product]);
    }
  }

  function removeFromCart(product: ProductInterface) {
    setOrderItems([...orderItems].filter((item) => item.code !== product.code));
  }

  return (
    <div className="grid-container">
      <Header />
      <h1>ProductList</h1>
      <div className="content flex flex-row">
        <div className="main w-3/4">
          <div className="products grid grid-cols-3 gap-x-8 gap-y-4">
            {products.map((product, index: number) => {
              return (
                <div key={index}>
                  <p>{product.name}</p>
                  <button onClick={() => addToCart(product)}>
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
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                );
              })}
              <button>Pass your order</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
