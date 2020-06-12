import React from 'react';
import TodoListItem from './todo_list_item'
import TodoForm from './todo_form'

const TodoList = (props) => {
    return (
        <>
            <ul>
                {props.todos.map(todo => (
                    <TodoListItem key={todo.id} todo={todo}/>
                ))}
            </ul>
            <TodoForm receiveTodo={props.receiveTodo}/>
        </>
    )
}

export default TodoList;