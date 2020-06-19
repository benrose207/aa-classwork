import { connect } from "react-redux";
import Search from "./search";
import { fetchBenches } from "../../actions/bench_actions"
import { allBenches } from "../../reducers/selectors";
import { updateBounds } from "../../actions/filter_actions";

const mapStateToProps = state => {
    return {
        benches: allBenches(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBenches: () => dispatch(fetchBenches()),
        updateBounds: (bounds) => dispatch(updateBounds(bounds)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);