import {
    FETCH_TASK_SUCCESS,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    UPDATE_TASK_SUCCESS,
    ERROR_MESSAGE,
    LOADING_REQUEST, CREATE_REQUEST, UPDATE_REQUEST, DELETE_REQUEST
} from "./actions.js"

const initTasks = {
    tasks: [],
}

const initLoader = {
    isLoading: false,
    isCreating: false,
    isDeleting: false,
    isUpdating: false,
}

const initErrors = {
    errors: null,
}

export const tasksReducer = (state = initTasks, action) => {
    switch (action.type) {
        case FETCH_TASK_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task,
                ),
                isUpdating: false,
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
                isDeleting: false,
            }
        default:
            return state
    }
}

export const loaderReducer = (state = initLoader, action) => {
    switch (action.type) {
        case LOADING_REQUEST:
            return {
                ...state,
                isLoading: action.payload,
            }
        case CREATE_REQUEST:
            return {
                ...state,
                isCreating: action.payload,
            }
        case UPDATE_REQUEST:
            return {
                ...state,
                isUpdating: action.payload,
            }
        case DELETE_REQUEST:
            return {
                ...state,
                isDeleting: action.payload,
            }
        default:
            return state
    }
}

export const errorsReducer = (state = initErrors, action) => {
    switch (action.type) {
        case ERROR_MESSAGE:
            return {
                ...state,
                errors: action.payload,
            }
        default:
            return state
    }
}
