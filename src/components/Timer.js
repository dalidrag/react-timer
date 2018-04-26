import React from 'react';

import TimerActionButton from './TimerActionButton';

export default class Timer extends React.Component {

    componentDidMount() {
        if (this.props.runningSince) this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
    }
      componentWillUnmount() {
        if (this.props.runningSince) clearInterval(this.forceUpdateInterval);
    }

    handleStartClick = () => {
        this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
        this.props.onStartClick(this.props.id);
    };
      handleStopClick = () => {
        clearInterval(this.forceUpdateInterval);
        this.props.onStopClick(this.props.id);
    };

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    pad(num, size) {
      var s = "000" + num;
      return s.substr(s.length-size);
    }

    render() {
    const localTimeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    const UTCTimeOptions = { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

    const runningSinceString = this.props.runningSince && new Date(this.props.runningSince).toLocaleTimeString('en-US', localTimeOptions);
    const elapsedTime = this.props.runningSince
      ? this.props.elapsed && new Date(Date.now() - this.props.runningSince + this.props.elapsed)
      : this.props.elapsed && new Date(this.props.elapsed)

    let elapsedString = elapsedTime.toLocaleTimeString('en-US', UTCTimeOptions) + ':' + this.pad(elapsedTime.getMilliseconds(), 3);
    elapsedString = elapsedString + ' / ' + runningSinceString;

    return (
          <div className='ui centered card'>
            <div className='content'>
    <div className='header'> {this.props.title}
       </div>
       <div className='meta'> {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
</h2> </div>
          <div className='extra content'>
          <span className='right floated edit icon'
                onClick={this.props.onEditClick} >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClick} >
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
); }
}