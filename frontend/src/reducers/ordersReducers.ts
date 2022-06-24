export const ordersReducer = (state = {}, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { orders: action.payload };
    default:
      return state;
  }
};
