import React from 'react';

export default class Tab extends React.Component {
    constructor (props) {
        super()
        this.state = { selected: 0 }
    }

    clickHandler(idx) {
        this.setState({ selected: idx });
    }

    render () {
    //   debugger 
        const selIdx = this.state.selected;
        return (
            <>
                <ul>
                    {this.props.tabs.map((ele, idx) => {
                        return(<h1 onClick={() => this.clickHandler(idx)} key={idx}>{ele.title}</h1>)
                    })}
                </ul>
                <article>{this.props.tabs[selIdx].content}</article>
            </>
        )
    }
}