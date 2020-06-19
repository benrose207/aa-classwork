import { connect } from "react-redux"
import BenchForm from "./bench_form";
import { createBench } from "../../actions/bench_actions";

import { withRouter } from "react-router-dom";

const mapStateToProps = (state, { location }) => ({
    lat: new URLSearchParams(location.search).get("lat"),
    lng: new URLSearchParams(location.search).get("lng")
});

const mapDispatchToProps = dispatch => ({
    createBench: bench => dispatch(createBench(bench))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BenchForm))