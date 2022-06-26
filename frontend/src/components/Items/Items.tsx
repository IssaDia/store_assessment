import React from "react";
import { ItemInterface } from "../../lib/interfaces/ItemInterface";

const Items: React.FC<ItemInterface[]> = (items) => {
  return (
    <>
      <ul className="items">
        {items.map((item, index: number) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Items;
