import React, { Component } from "react";
import "./Timer.css";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      days: 0,
      minutes: 0,
      hours: 0,
      secounds: 0,
      timeUp: ""
    };
    this.expireCounter = null;
    this.deadline = null;
  }
  count() {
    let now = new Date().getTime();
    let restTime = this.deadline - now;
    let restDays = Math.floor(restTime / (1000 * 60 * 60 * 24));
    let restHours = Math.floor((restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let restMinutes = Math.floor((restTime % (1000 * 60 * 60)) / (1000 * 60));
    let restSeconds = Math.floor((restTime % (1000 * 60)) / 1000);

    let days = restDays < 10 ? "0" + restDays : restDays;
    let hours = restHours < 10 ? "0" + restHours : restHours;
    let minutes = restMinutes < 10 ? "0" + restMinutes : restMinutes;
    let seconds = restSeconds < 10 ? "0" + restSeconds : restSeconds;

    this.setState({ days, minutes, hours, seconds });

    if (restTime < 0) {
      clearInterval(this.expireCounter);
      this.setState({
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
        timeUp: "TIME IS UP"
      });
    }
  }
  componentDidMount() {
    this.deadline = new Date("Apr 15, 2022 00:00:00").getTime();
    this.expireCounter = setInterval(this.count, 1000);
  }

  render() {
    const { days, seconds, hours, minutes } = this.state;
    return (
      <div id="countdown">
        <div className="counter-status">
          <div className="box">
            <p id="day">{days}</p>
            <span className="text">Days</span>
          </div>
        </div>
        <div className="counter-status">
          <div className="box">
            <p id="hour">{hours}</p>
            <span className="text">Hours</span>
          </div>
        </div>
        <div className="counter-status">
          <div className="box">
            <p id="minute">{minutes}</p>
            <span className="text">Minutes</span>
          </div>
        </div>
        <div className="counter-status">
          <div className="box">
            <p id="second">{seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;