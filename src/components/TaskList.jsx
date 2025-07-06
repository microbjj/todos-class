import { TaskItem } from "./TaskItem.jsx"
import { Component } from "react"

export class TaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center w-[30px]"
                        >
                            №
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Задача {this.props.sortButton}
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center w-[30px]"
                        >
                            Выполнено
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center w-[100px]"
                        >
                            Действия
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.sortedTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} />
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}