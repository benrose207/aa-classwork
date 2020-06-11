const Store = require('./store')

let state = {
  user: "Andy",
  role: "Instructor"
};
const action1 = {
  type: "change role",
  newRole: "Student"
};

const action2 = {
  type: "change role",
  newRole: "Teacher"
}

const roleReducer = (prevState = null, action) => {
  if (action.type === "change role") {
    let newState = prevState.getState()
    newState.role = action.newRole
    return newState
  } else {
    return prevState;
  }
};

const newStore = new Store()
roleReducer(newStore.state, action1)