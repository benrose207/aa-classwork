import React from "react";
import BenchIndexItem from "./bench_index_item";

class BenchIndex extends React.Component {
    componentDidMount() {
        this.props.fetchBenches();
    }

    render() {
        return (
            <ul>
                {this.props.benches.map(bench => (
                    <BenchIndexItem key={bench.id} bench={bench}/>
                ))}
            </ul>
        )
    }
}

export default BenchIndex