import React from 'react'

class TodoForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            id: Math.floor(Math.random() * 10000),
            title: '',
            body: '',
            done: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createTitle = this.createTitle.bind(this);
        this.createBody = this.createBody.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.receiveTodo(this.state);
        this.setState({
            id: Math.floor(Math.random() * 10000),
            title: '',
            body: '',
            done: false
        }); 
    }

    createTitle () {
        this.setState({title: event.target.value});
    }

    createBody () {
        this.setState({body: event.target.value});
    }

    render (){
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Create New Task!</h4>
                <br/>
                <label> Title:
                    <input type="text" value={this.state.title} onChange={this.createTitle}/>
                </label>
                <br/>
                <label> Body:
                    <input type="text" onChange={this.createBody} value={this.state.body}/>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

}

export default TodoForm;