import { createStore } from "redux";
import reducers from "./index";

export default function configureStore() {
  return createStore(reducers);
}

// // yukarıda olan yazım eski sürümlere haz bir yazılım ama redux-thunk yüklü olmadığı için bende eski yazımı kullanacağım şimdilik sonrasında değişiklik yapılabilir

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk"; // Örnek olarak thunk middleware
// import rootReducer from "./index";

// const configureStore = () => {
//   const middleware = [thunk]; // Middleware'lerinizi burada tanımlayın, örneğin thunk

//   const store = createStore(rootReducer, applyMiddleware(...middleware));

//   return store;
// };

// export default configureStore;
