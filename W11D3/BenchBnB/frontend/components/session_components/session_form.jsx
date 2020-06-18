import React from "react";
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value })
        }
    }

    render () {

        const formHeader = (this.props.formType === "signup" ? (
            <>
                <h2>Sign Up</h2>
                <p>Already a user? Log in <Link to="/login">here</Link></p>
            </>
        ) : (
            <>
                <h2>Log In</h2>
                <p>Don't have an account? Sign up <Link to="/signup">here</Link></p>
            </>
        ))
        
        const errors = ( this.props.errors ? (
            <h4>{this.props.errors.join(", ")}</h4>
        ) : <>""</> )

        return (
            <div>
                {errors}
                {formHeader}
                <form onSubmit={this.handleSubmit}>
                    <label>Username: 
                        <input 
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInput("username")}
                        />
                    </label>
                    <label>Password: 
                        <input 
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInput("password")}
                        />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SessionForm;