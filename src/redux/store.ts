import { combineReducers, createStore, Store } from "redux";
import { firstReducer } from "./first";

const rootReducer = combineReducers({
  first: firstReducer,
});

const store: Store = createStore(rootReducer);

export default store;

// {
//   objective: {
//     name: ""
//     deadline: ""
//     keyResults: [
//       {
//         name: "",
//         deadline: "",
//         initiatives: [
//           initiative: {
//             name: "",
//             deadline: "",
//           }
//         ]
//       }
//     ]
//   }
// }
