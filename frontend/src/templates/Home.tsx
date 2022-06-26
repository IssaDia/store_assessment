import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Status } from "../lib/enums/Order";
import { OrderInterface } from "../lib/interfaces/OrderInterface";
import { ProductInterface } from "../lib/interfaces/ProductInterface";
import { cartSelector } from "../redux";
import { useAddOrderMutation } from "../services/OrderApi";
import { useGetProductsQuery } from "../services/ProductsApi";

function Home() {
  const { data: products, isSuccess } = useGetProductsQuery();

  const orderItems = useSelector(cartSelector);

  const dispatch = useDispatch();

  const [addOrder] = useAddOrderMutation();
  const addHandler = async () => {
    const order: OrderInterface = {
      _id: uuidv4(),
      date: new Date(),
      orderItems: orderItems,
      status: Status.PendingA,
    };
    await addOrder(order);
  };
  return (
    <><div className="flex align-center">

      <h1>ProductList</h1>
    </div>
      <div className="content flex flex-row">
        <div className="main w-3/4">
          <div className="products grid grid-cols-3 gap-x-8 gap-y-4">
            {isSuccess &&
              products.map((product: ProductInterface, index: number) => {
                return (
                  <div key={index}>
                    {/* <p>{product.name}</p>
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
                    </button> */}
                    <div className="flex items-center justify-center">
                      <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
                        <div className="p-5">
                          <p className="text-medium mb-5 text-gray-700">
                            {product.name}
                          </p>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "cart/addToCart",
                                payload: product,
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
                className="btn btn-warning"
                onClick={addHandler}
              >
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