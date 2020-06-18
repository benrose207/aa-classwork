import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import GreetingContainer from "./greeting/greeting_container";
import loginFormContainer from "./session_components/login_form_container";
import signupFormContainer from "./session_components/signup_form_container";
import SearchContainer from "./benches/search_container";

const App = () => {
    return (
        <div>
            <header>
                <h1>Bench BnB</h1>
                <GreetingContainer />
            </header>

            <AuthRoute path="/login" component={loginFormContainer}/>
            <AuthRoute path="/signup" component={signupFormContainer}/>
            <Route exact path="/" component={SearchContainer}/>
        </div>
    )
};

export default App;