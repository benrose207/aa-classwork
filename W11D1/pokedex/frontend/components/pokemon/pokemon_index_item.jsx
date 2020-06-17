import React from "react";
import { Link } from "react-router-dom";

const PokemonIndexItem = ({poke}) => {
    return (
        <li>
            <Link to={`/pokemon/${poke.id}`}>
                <span>{poke.id}</span>
                <img className='small-image' src={poke.image_url} />
                {poke.name}
            </Link> 
        </li>
    )
}

export default PokemonIndexItem;