export default (state = [], action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return { ...state };
    case "GET_MOVIES_SUCCESS":
      return { ...state, movies: action.res };
    default:
      return state;
  }
}
