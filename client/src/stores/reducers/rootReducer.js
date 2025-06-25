import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commomConfig = {
    storage,
    stateReconciler : autoMergeLevel2
}

//lưu những gì xuống local
const authConfig = {
    ...commomConfig,
    key : 'auth',
    whitelist : ['isLoggedIn' , 'token']
}

const rootReduce =  combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user : userReducer
})

export default rootReduce 