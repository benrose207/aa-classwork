import React from 'react';

export default class Clock extends React.Component {
  constructor () {
      super() 
      this.state = {time: new Date()}
  }

  tick() {
    this.setState({time: new Date()})
  }

  componentDidMount(){
   this.intervalId = setInterval(this.tick.bind(this), 1000); 
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }



    render () {
      const hours = this.state.time.getHours();  
      const mins = this.state.time.getMinutes(); 
      const secs = this.state.time.getSeconds(); 
      const date = this.state.time.toDateString();

        return (
          <div className="clock">
            <h1>Time's Up</h1>
            <div className="time-ele">
                <p>Time:</p> 
                <p>{hours}:{mins}:{secs} PST</p>
            </div> 
            <div className="time-ele">
                <p>Date:</p> 
                <p>{date}</p>
            </div> 
          </div>
        )
    }
}