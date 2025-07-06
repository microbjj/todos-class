import { debounce } from "./debounce.js"
import { Component } from "react"
import { SortButton, Search, TaskForm, TaskList, Loader } from "./components"
import { connect } from "react-redux"
import { getTasks } from "./store/actions.js"
import { selectAppState } from "./store/selectors.js"


export class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            isSorted: false,
            filteredTasks: props.tasks
        }

        this.debounceFilter = debounce((searchQuery) => {
            const filtered = this.props.tasks.filter((task) =>
                task.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
            this.setState({ filteredTasks: filtered });
        }, 1000);
    }
    
    componentDidMount() {
        this.props.getTasks()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tasks !== this.props.tasks || prevState.query !== this.state.query) {
            if (!this.state.query) {
                this.setState({ filteredTasks: this.props.tasks });
            } else {
                this.debounceFilter(this.state.query);
            }
        }
    }


    setQuery = (e) => {
        this.setState({
            ...this.state,
            query: e.target.value
        })
    }

    setIsSorted = (flag) => {
        this.setState({
            ...this.state,
            isSorted: flag
        })
    }

    render() {
        const { errors, isLoading } = this.props;
        const { isSorted, filteredTasks } = this.state;

        const sortedTasks = isSorted
            ? [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text))
            : filteredTasks;
        return (
            <div className="container w-3xl mx-auto">
                <Search query={this.state.query} setQuery={this.setQuery} />

                {errors && <div className="text-red-900">{errors}</div>}
                {isLoading ? (
                    <Loader />
                ) : (
                    <TaskList
                        sortButton={
                            <SortButton
                                isSorted={isSorted}
                                setIsSorted={this.setIsSorted}
                            />
                        }
                        sortedTasks={sortedTasks}
                    />
                )}
                <TaskForm />
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    const { tasks, errors, isLoading } = selectAppState(state);
    return {
        tasks: tasks,
        errors,
        isLoading,
    };
}

const mapDispatchToProps = {
    getTasks
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer)