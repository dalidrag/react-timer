import React from 'react';
import uuid from 'uuid';

import PersistenceService from '../services/PersistenceService';

import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';


// setState updater
function setTimer(timers, timerId, oldTimerValue) {
    const now = Date.now();

    return timers.map((timer) => {
        if (timer.id === timerId) {
            if (oldTimerValue) {
                return oldTimerValue;
            }
            else {
                const lastElapsed = now - timer.runningSince;
                return Object.assign({}, timer, {
                    elapsed: timer.elapsed + lastElapsed,
                    runningSince: null,
                });
            }
        } else {
            return timer;
        }
    });
}

export default class TimersDashboard extends React.Component {
    state = { timers: [] };
    static persistenceService = new PersistenceService;
    static oldTimerValue = {};
    /*        timers: [
              {
                title: 'Practice squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 1,
                runningSince: Date.now(),
        }, {
                title: 'Bake squash',
                project: 'Kitchen Chores',
                id: uuid.v4(),
                elapsed: 1,
                runningSince: null,
        }, ],
        }; */

    componentDidMount() {
        TimersDashboard.persistenceService.loadTimers().then((loadedTimers) => {
            this.setState({ timers: loadedTimers });
        })
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    createTimer = (timer) => {
        const t = { title: timer.title, project: timer.project, id: uuid.v4(), elapsed: 1, runningSince: null, }
        TimersDashboard.persistenceService.updateTimer(t, this.state.timers.length, t)
            .then(() => TimersDashboard.persistenceService.loadTimers())
            .then((loadedTimers) => {
                this.setState({
                    timers: loadedTimers,
                });
            })
    };

    updateTimer = (attrs) => {
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === attrs.id) {
                    return Object.assign({}, timer, {
                        title: attrs.title,
                        project: attrs.project,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    deleteTimer = (timerId) => {
        this.setState({
            timers: this.state.timers.filter(t => t.id !== timerId),
        });
    };

    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };
    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };

    startTimer = (timerId) => {
        const now = Date.now();
        this.setState({
            timers: this.state.timers.map((timer) => {
                if (timer.id === timerId) {
                    TimersDashboard.oldTimerValue = timer;
                    return Object.assign({}, timer, {
                        runningSince: now,
                    });
                } else {
                    return timer;
                }
            }),
        });
    };

    stopTimer = (timerId) => {
        const now = Date.now();

        let timerIndex = 0;
        for (let timer of this.state.timers) {
            if (timer.id !== timerId) {
                ++timerIndex;
                continue;
            }

            const lastElapsed = now - timer.runningSince;
            TimersDashboard.persistenceService.updateTimer(timer, timerIndex, { elapsed: timer.elapsed + lastElapsed, runningSince: null })
                .then(() => TimersDashboard.persistenceService.loadTimers())
                .then((loadedTimers) => {
                    this.setState({ timers: loadedTimers });
                })
                .catch(() => {
                    this.setState({ timers: setTimer(this.state.timers, timerId, TimersDashboard.oldTimerValue) });
                })

            break;
        }

        this.setState({ timers: setTimer(this.state.timers, timerId) });

    };

    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList timers={this.state.timers} onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick} onStopClick={this.handleStopClick} />
                    <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
                </div>
            </div>
        );
    }
}