export const FETCH_TASK_SUCCESS = "FETCH_TASK_SUCCESS"
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS"
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS"
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS"

export const LOADING_REQUEST = "LOADING_REQUEST"
export const CREATE_REQUEST = "CREATE_REQUEST"
export const UPDATE_REQUEST = "UPDATE_REQUEST"
export const DELETE_REQUEST = "DELETE_REQUEST"

export const ERROR_MESSAGE = "ERROR_MESSAGE"


export const getTasks = () => async (dispatch) => {
    dispatch({ type: LOADING_REQUEST, payload: true })
    try {
        const response = await fetch("http://localhost:3001/tasks")
        const tasksData = await response.json()
        dispatch({
            type: FETCH_TASK_SUCCESS,
            payload: tasksData,
        })
    } catch (error) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: error.message,
        })
    } finally {
        dispatch({ type: LOADING_REQUEST, payload: false })
    }
}

export const createTask = (task) => async (dispatch) => {
    dispatch({ type: CREATE_REQUEST, payload: true })
    try {
        const response = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
        const newTask = await response.json()
        dispatch({
            type: CREATE_TASK_SUCCESS,
            payload: newTask,
        })
    } catch (error) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: error.message,
        })
    } finally {
        dispatch({ type: CREATE_REQUEST, payload: false })
    }
}

export const deleteTask = (id) => async (dispatch) => {
    dispatch({ type: DELETE_REQUEST, payload: true })
    try {
        await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE",
        })
        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: id,
        })
    } catch (error) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: error.message,
        })
    } finally {
        dispatch({ type: DELETE_REQUEST, payload: false })
    }
}

export const updateTask = (id, task) => async (dispatch) => {
    dispatch({ type: UPDATE_REQUEST, payload: true })
    try {
        const response = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        })
        const updateTask = await response.json()
        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: updateTask,
        })
    } catch (error) {
        dispatch({
            type: ERROR_MESSAGE,
            payload: error.message,
        })
    } finally {
        dispatch({ type: UPDATE_REQUEST, payload: false })
    }
}
