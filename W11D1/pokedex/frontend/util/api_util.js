export const fetchAllPokemon = () => {
    return $.ajax({
        method: "GET",
        url: "/api/pokemon"
    })
}

export const fetchOnePokemon = (pokemonId) => {
    return $.ajax({
        method: 'get',
        url: `/api/pokemon/${pokemonId}`
    })
}