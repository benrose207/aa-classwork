import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from "../actions/session_actions";

const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            let nextState = state.slice();
            return nextState.concat(action.errors.responseJSON);
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
}

export default sessionErrorsReducer;