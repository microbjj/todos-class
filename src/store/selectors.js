import { createSelector } from "reselect"

const tasksSelector = (state) => state.tasks.tasks
const errorsSelector = (state) => state.errors.errors
const isLoadingSelector = (state) => state.loader.isLoading
const isUpdatingSelector = (state) => state.loader.isUpdating
const isDeletingSelector = (state) => state.loader.isDeleting


export const isCreatingSelector = (state) => state.loader.isCreating

export const selectAppState = createSelector(
    [tasksSelector, errorsSelector, isLoadingSelector],
    (tasks, errors, isLoading) => ({ tasks, errors, isLoading }),
)

export const selectTaskItemState = createSelector(
    [isUpdatingSelector, isDeletingSelector],
    (isUpdate, isDeleting) => ({ isUpdate, isDeleting }),
)
