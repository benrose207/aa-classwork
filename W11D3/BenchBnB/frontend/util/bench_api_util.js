
export const fetchBenches = (filters) => {
    return $.ajax({
        method: "GET",
        url: "/api/benches",
        data: {bounds: filters} // not sure about this at all 
    })
}

export const createBench = (bench) => {
    return $.ajax({
        method: "POST",
        url: "api/benches",
        data: { bench }
    })
}