const fetchOrders = () => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
  const res = await fetch("/api/orders");
  dispatch({
    type: "FETCH_ORDERS",
    payload: res,
  });
};

export default fetchOrders;
