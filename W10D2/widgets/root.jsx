import React from 'react';
import Clock from './frontend/clock';
import Tab from './frontend/tab';

const tabs = [{ title: "tab1", content: "this is tab 1" },
{ title: "tab2", content: "this is tab 2" },
{ title: "tab3", content: "this is tab 3" }
];

export default class Root extends React.Component {
    render () {
        return (
            <div>
                <Clock/>
                <Tab tabs={tabs}/>
            </div>
        )
    }
}