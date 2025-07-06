import { Component } from "react"


export class Search extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <input
                type="text"
                value={this.props.query}
                onChange={this.props.setQuery}
                className="mt-6 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                placeholder="Поиск.."
            />
        )
    }
}