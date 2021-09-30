module.exports = {
    name: 'stateChange',
    execute() {
        const color = "\x1b[33m%s\x1b[0m";
        connection.on('stateChange', (oldState, newState) => {
            console.log(color, `Connection transitioned from ${oldState.status} to ${newState.status}`);
        });
        
        player.on('stateChange', (oldState, newState) => {
            console.log(color, `Audio player transitioned from ${oldState.status} to ${newState.status}`);
        });
    }
}