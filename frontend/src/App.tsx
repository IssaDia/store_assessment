import { useEffect, useState } from "react";
import Header from "./components/Header";
import { products } from "../src/lib/data/Products";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import Products from "./components/Products/Products";

function App() {
  const [productList, setProductList] = useState<ProductInterface[]>(products);

  return (
    <div className="grid-container">
      <Header />
      <h1>ProductList</h1>
      <div className="content flex flex-row">
        <div className="main w-3/4">
          <div className="products grid grid-cols-3 gap-x-8 gap-y-4">
            {products.map((product, index: number) => {
              return (
                <div>
                  <p key={index}>{product.name}</p>
                  <button>Add to order</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sidebar w-1/4">Cart Item</div>
      </div>
    </div>
  );
}

export default App;
