import React from "react";

class PokemonDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger
        this.props.requestOnePokemon(this.props.match.params.pokemonId);
    }

    render() {
        if (!this.props.poke) return null
        return (
            <>
                {/* {this.props.poke ? this.props.poke.name : "" } */}
                <ul>
                    <li>{this.props.poke.name}</li>
                    <li>{this.props.poke.attack}</li>
                    <li>{this.props.poke.defense}</li>
                    <li>{this.props.poke.poke_type}</li>
                </ul>
            </>
        )
    }
}

export default PokemonDetail;