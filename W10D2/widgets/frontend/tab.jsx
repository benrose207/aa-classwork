import React from 'react';

export default class Tab extends React.Component {
    constructor (props) {
        super(props)
        this.state = { selected: 0 }
    }

    clickHandler(idx) {
        this.setState({ selected: idx });
    }

    render () {
    //   debugger 
        const { tabs } = this.props
        const {selected} = this.state;
        return (
            <div className="tabs">
                <ul className="tab-list">
                    {tabs.map((ele, idx) => (
                        <li onClick={() => this.clickHandler(idx)} key={idx}>{ele.title}</li>
                    ))}
                </ul>
                <article>{tabs[selected].content}</article>
            </div>
        )
    }
}