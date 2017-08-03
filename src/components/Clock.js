import React, { PureComponent } from 'react';
import './Clock.scss'

import { getSystemLanguage } from '../utils'

import moment from 'moment';

class Clock extends PureComponent {
  constructor() {
    super()
    this.state = {
      monthName: '',
      date: '',
      hours: '',
      minutes: '',
      seconds: '',
      locale: 'en'
    }
  }
  componentWillMount() {
    this.setState({
      // locale: 'es'
      locale: getSystemLanguage()
    })
    this.timeLoop();
  }
  timeLoop() {
    this.loop = setInterval(() => {
      const now = moment();
      this.setState({
        monthName:  now.locale(this.state.locale).format('MMMM'),
        date: now.locale(this.state.locale).format('Do YYYY'),
        hours: now.locale(this.state.locale).format('h'),
        minutes: now.locale(this.state.locale).format('mm'),
        seconds: now.locale(this.state.locale).format('ss')
      })
    }, 1000)
  }
  render() {
    return (
      <div className="clock">
        <div className="clock-baseline">
          <div className="clock-date">
            {`${this.state.monthName} ${this.state.date}`}
          </div>
          <div className="clock-hour">
            <span className="clock-hour-hours">{this.state.hours}</span>
            <span className="clock-hour-minutes">{`:${this.state.minutes}`}</span>
            <span className="clock-hour-seconds">{`:${this.state.seconds}`}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;