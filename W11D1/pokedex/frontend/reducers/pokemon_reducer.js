import { RECEIVE_ALL_POKEMON, RECEIVE_ONE_POKEMON } from "../actions/pokemon_actions";

const pokemonReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_ALL_POKEMON:
            newState = Object.assign({}, state, action.pokemon);
            return newState;

        case RECEIVE_ONE_POKEMON:
            newState[action.pokemon.pokemon.id] = action.pokemon.pokemon;
            return newState;

        default:
            return state;
    }
}

export default pokemonReducer;