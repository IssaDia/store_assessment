import React from "react";
import { ItemInterface } from "../../lib/interfaces/ItemInterface";
import { useDispatch, useSelector } from "react-redux";


const Items: React.FC<ItemInterface[]> = (items) => {
    const dispatch = useDispatch();
console.log(items);

    

  return (
    <>
      {items.map((item, index: number) => {
        return (
          <div key={index}>
            <div className="flex items-center justify-center">
              <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
                <div className="p-5">
                  <p className="text-medium mb-5 text-gray-700">{item.name}</p>
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
    </>
  );
};

export default Items;
