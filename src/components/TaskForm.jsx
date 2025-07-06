import { connect } from "react-redux"
import { createTask } from "../store/actions.js"
import { isCreatingSelector } from "../store/selectors.js"
import { Component } from "react"

export class TaskFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { task: "" }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({ task: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault()
        if (this.state.task === '') {
            return
        }
        this.props.createTask({ text: this.state.task, completed: false })
        this.setState({ task: "" })
    }

    render() {
        return (
            <form
                className="flex gap-x-2 items-center"
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Введите новую задачу..."
                    value={this.state.task}
                    onChange={this.onChange}
                />
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    disabled={this.props.isCreating}
                    type="submit"
                >
                    {this.props.isCreating ? "Создание.." : "Добавить"}
                </button>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    isCreating: isCreatingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    createTask: (task) => dispatch(createTask(task)),
})

export const TaskForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskFormContainer)
