import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import GreetingContainer from "./greeting/greeting_container";
import loginFormContainer from "./session_components/login_form_container";
import signupFormContainer from "./session_components/signup_form_container";
import SearchContainer from "./benches/search_container";
import BenchFormContainer from "./benches/bench_form_container"

const App = () => {
    return (
        <div>
            <header>
                <nav>
                    <h1>Bench BnB</h1>
                    <GreetingContainer />
                </nav>
            </header>

            <section>
                <AuthRoute path="/login" component={loginFormContainer}/>
                <AuthRoute path="/signup" component={signupFormContainer}/>
                <Route exact path="/" component={SearchContainer}/>
                <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} />
            </section>
        </div>
    )
};

export default App;