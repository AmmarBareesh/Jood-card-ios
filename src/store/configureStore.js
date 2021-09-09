import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import TokenReducer from "./reducers/auth";
import UserReducer from "./reducers/user";
import UIReducer from "./reducers/ui";
import NotificationReducer from "./reducers/notification";
import NotificationsListReducer from './reducers/notificationList';
import UserCardReducer from './reducers/userCard';
import AccountStatementReducer from './reducers/accountStatement';
import BottomStatus from './reducers/BottomStatus';
import OrdersReducer from './reducers/orders';
import CommentsReducer from './reducers/orderComment';
import OrderDetailsReducer from './reducers/orderDetails';
import OrderProductReducer from './reducers/orderProduct';
import ProductExampleReducer from './reducers/productExample';
import OrderCardReducer from './reducers/orderCards';

const rootReducer = combineReducers({
  token: TokenReducer,
  ui: UIReducer,
  user: UserReducer,
  notification:NotificationReducer,
  notificationList:NotificationsListReducer,
  userCard:UserCardReducer,
  accountStatements:AccountStatementReducer,
  bottomStatus: BottomStatus,
  orders:OrdersReducer,
  comments:CommentsReducer,
  orderDetails:OrderDetailsReducer,
  orderProduct:OrderProductReducer,
  productExample:ProductExampleReducer,
  orderCard:OrderCardReducer
});


let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
