import { applyMiddleware, combineReducers, createStore, compose } from "redux"
import { errorsReducer, loaderReducer, tasksReducer } from "./reducer"
import { thunk } from "redux-thunk"

const reducer = combineReducers({
    tasks: tasksReducer,
    loader: loaderReducer,
    errors: errorsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))