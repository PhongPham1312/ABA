import rootReduce from "./stores/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore } from "redux";

const reduxStore = () =>{
    const store = createStore(rootReduce);
    const persistor = persistStore(store);;

    return {store, persistor};
}

export default reduxStore