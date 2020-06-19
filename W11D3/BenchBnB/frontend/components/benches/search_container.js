import { connect } from "react-redux";
import Search from "./search";
import { fetchBenches } from "../../actions/bench_actions"
import { allBenches } from "../../reducers/selectors";
import { updateFilter } from "../../actions/filter_actions";

const mapStateToProps = state => {
    return {
        benches: allBenches(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBenches: () => dispatch(fetchBenches()),
        updateFilter: (bounds) => dispatch(updateFilter(bounds)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);