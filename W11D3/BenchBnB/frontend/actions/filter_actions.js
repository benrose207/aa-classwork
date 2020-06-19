import { fetchBenches } from "./bench_actions";

export const UPDATE_BOUNDS = "UPDATE_BOUNDS";

export const updateBounds = (bounds) => {
    return {
        type: UPDATE_BOUNDS,
        bounds
    }
};

export const updateFilter = (filter, value) => {
    return (dispatch, getState) => {
        dispatch(updateBounds(filter, value))
        return fetchBenches(getState().ui.filters)(dispatch);
    }
}