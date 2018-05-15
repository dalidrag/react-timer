export default class TimersPersistence {

    createTimer(timer, timerIndex) {
        return new Promise((resolve, reject) => {
            const timerKeyString = `timer-${timerIndex}`

            const titleKeyString = timerKeyString + 'title';
            const projectKeyString = timerKeyString + 'project';
            const idKeyString = timerKeyString + 'id';
            const elapsedKeyString = timerKeyString + 'elapsed';
            const runningSinceKeyString = timerKeyString + 'runningSince';
            
            localStorage.setItem(titleKeyString, timer.title);
            localStorage.setItem(projectKeyString, timer.project);
            localStorage.setItem(idKeyString, timer.id);
            localStorage.setItem(elapsedKeyString, timer.elapsed);
            localStorage.setItem(runningSinceKeyString, timer.runningSince);
            
            resolve(true);
        });
    }
    
    updateTimer(timer, timerIndex, toUpdate) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                if (timerIndex === 0) {
                    const timerKeyString = `timer-${timerIndex}`

                    const titleKeyString = timerKeyString + 'title';
                    const projectKeyString = timerKeyString + 'project';
                    const idKeyString = timerKeyString + 'id';
                    const elapsedKeyString = timerKeyString + 'elapsed';
                    const runningSinceKeyString = timerKeyString + 'runningSince';
                    
                    localStorage.setItem(titleKeyString, toUpdate.title ? toUpdate.title : timer.title);
                    localStorage.setItem(projectKeyString, toUpdate.project ? toUpdate.project : timer.project);
                    localStorage.setItem(idKeyString, toUpdate.id ? toUpdate.id : timer.id);
                    localStorage.setItem(elapsedKeyString, toUpdate.elapsed ? toUpdate.elapsed : timer.elapsed);
                    localStorage.setItem(runningSinceKeyString, toUpdate.runningSince);
                    
                    resolve(true);
                }
                else {
                    reject();
                }
            }, 500)
        });
    };

    loadTimers() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let loadedTimers = [];
    
                let i = 0;
                while (localStorage.getItem(`timer-${i}id`)) {
                    let loadedTimer = {
                        title: localStorage.getItem(`timer-${i}title`),
                        project: localStorage.getItem(`timer-${i}project`),
                        id: localStorage.getItem(`timer-${i}id`),
                        elapsed: +localStorage.getItem(`timer-${i}elapsed`),
                        runningSince: localStorage.getItem(`timer-${i}runningSince`) !== 'null' ? new Date(+localStorage.getItem(`timer-${i}runningSince`)) : null,
                    }
                    loadedTimers.push(loadedTimer);
                    ++i;
                }
            
                resolve(loadedTimers);
            }, 500)
            
        });
    } 
}
