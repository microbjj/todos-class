import { Component } from "react"
import { connect } from "react-redux"
import { deleteTask, updateTask } from "../store/actions.js"
import { selectTaskItemState } from "../store/selectors.js"


export class TaskItemContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            editText: this.props.task.text
        }
        this.task = this.props.task
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            editText: e.target.value
        })
    }

    handleOnClick = (flag) => {
        this.setState({
            ...this.state,
            isEdit: flag,
        })
    }

    handleCheckBox = (e) => {
        this.props.updateTask(this.task.id, {
            text: this.task.text,
            completed: e.target.checked
        })
    }

    handleUpdateTask = () => {
        this.props.updateTask(this.task.id, {
                text: this.state.editText
            })
        this.setState({
            ...this.state,
            isEdit: false,
        })
    }

    handleDeleteTask = () => {
        this.props.deleteTask(this.task.id)
    }

    render() {
        const { index, task } = this.props
        return (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                >
                    {index + 1}
                </th>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {this.state.isEdit ? (
                        <input
                            autoFocus
                            type="text"
                            value={this.state.editText}
                            onChange={this.onChange}
                        />
                    ) : (
                        <span className="mr-4">{task.text}</span>
                    )}
                </th>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  text-center"
                >
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={this.handleCheckBox}
                        disabled={this.state.isUpdating}
                    />
                </th>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  text-center"
                >
                    {this.state.isEdit ? (
                        <div>
                            <Button
                                disabled={this.state.isUpdating}
                                onClick={this.handleUpdateTask}
                            >
                                Save
                            </Button>
                            <Button onClick={() => this.handleOnClick(false)}>
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={() => this.handleOnClick(true)}>
                                Edit
                            </Button>

                            <Button
                                disabled={this.state.isDeleting}
                                onClick={this.handleDeleteTask}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </th>
            </tr>
        )
    }
}

class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button
                disabled={this.props.disabled}
                className="text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 mr-2"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    const taskItemState = selectTaskItemState(state)
    return {
        isUpdating: taskItemState.isUpdate,
        isDeleting: taskItemState.isDeleting
    }
}

const mapDispatchToProps = {
    updateTask,
    deleteTask
}

export const TaskItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskItemContainer)
