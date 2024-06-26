import { combineReducers } from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import categoryListReducer from "./categoryListReducer";
import productListReducer from "./productListReducer";
import cartReducer from "./cartReducer";
import saveProductReducer from "./saveProductReducer";
const rootReducer = combineReducers({
  //   changeCategoryReducer: changeCategoryReducer,
  //   a:changeCategoryReducer
  //   yukarıdakiiki ayrı kod satırı da şu an kullandığımız ile aynı işlevi görmektedir
  changeCategoryReducer,
  categoryListReducer,
  productListReducer,
  cartReducer,
  saveProductReducer,
});

export default rootReducer;
