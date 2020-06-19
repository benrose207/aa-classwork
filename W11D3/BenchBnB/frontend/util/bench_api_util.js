
export const fetchBenches = (filters) => {
    return $.ajax({
        method: "GET",
        url: "/api/benches",
        data: {bounds: filters} // not sure about this at all 
    })
}

