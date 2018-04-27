const timers = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_TIMERS':
        return action.timers;
      default:
        return state
    }
  };

  export default timers;