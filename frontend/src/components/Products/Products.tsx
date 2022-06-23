import React from "react";
import { ProductInterface } from "../../lib/interfaces/ProductInterface";

const Products: React.FC<ProductInterface[]> = (products) => {
  return (
    <>
      <ul className="products">
        {products.map((product, index: number) => {
          return <li key={index}>{product.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Products;
