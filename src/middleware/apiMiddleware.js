const baseUrl = "https://star-wars-api.herokuapp.com";

export default store => next => async (action) => {
  if (action.url) {

    await fetch(`${baseUrl}${action.url}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        delete action.url;
        store.dispatch({
          ...action,
          type: action.type + '_SUCCESS',
          res
        })
      })
      .catch((err) => console.log(err));
  }

  next(action);
}
