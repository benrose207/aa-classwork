import React from "react";

class BenchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: "",
            seating: 2,
            lat: this.props.lat,
            lng: this.props.lng
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createBench(this.state)
            .then(() => this.props.history.push("/"))
    }

    render () {
        return (
            <>
                <h3>Add a New Location</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Description: 
                        <input 
                            type="text"
                            value={this.state.description}
                            onChange={this.handleInput("description")}
                        />
                    </label>
                    <label>Number of Seats: 
                        <input 
                            type="number"
                            value={this.state.seating}
                            onChange={this.handleInput("seating")}
                        />
                    </label>
                    <label>Latitude:
                        <input 
                            type="text"
                            value={this.state.lat}
                            disabled
                        />
                    </label>
                    <label>Longitude: 
                        <input 
                            type="text"
                            value={this.state.lng}
                            disabled
                        />
                    </label>
                    <button>Save</button>
                </form>
            </>
        )
    }
}

export default BenchForm;