export const loadTimers = (timers) => {
    return { type: 'LOAD_TIMERS', timers }
}

export const showLoadingMessage = (state) => {
    return { type: 'IS_LOADING', payload: state }
}
/*
export const createTimer = async newTimer => {
    
    await persistenceService.updateTimer(t, this.state.timers.length, t);

    return { type: 'CREATE_TIMER', newTimer }
  }
  */