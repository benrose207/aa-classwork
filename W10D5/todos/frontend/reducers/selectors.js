const allTodos = (state) => {
    const keys = Object.keys(state.todos)
    return keys.map(key => state.todos[key])
}

export default allTodos;