import PokemonDetail from "./pokemon_detail";
import { connect } from "react-redux";
import { requestOnePokemon } from "../../actions/pokemon_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        poke: state.entities.pokemon[ownProps.match.params.pokemonId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestOnePokemon: (pokemon) => dispatch(requestOnePokemon(pokemon))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonDetail)