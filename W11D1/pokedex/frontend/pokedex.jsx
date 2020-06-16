import React from "react";
import ReactDOM from "react-dom";

import fetchAllPokemon from "./util/api_util"

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<h1>It's working</h1>, root);

    window.fetchAllPokemon = fetchAllPokemon;
})