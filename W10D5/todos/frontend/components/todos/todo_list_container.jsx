import { connect } from 'react-redux';
import TodoList from './todo_list';
import { fetchTodos } from '../../actions/todo_actions';
import allTodos from '../../reducers/selectors';

const mapStateToProps = (state) => ({
    todos: allTodos(state)
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => dispatch(fetchTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);