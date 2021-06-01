module.exports = {
    name: 'bday',
    description: 'Happy bday for youuu!!',
    execute(message, args, client) {
        const todayDate = Date().slice(3, 10);
        const { AranhaBoladona_ID, ilustraGra_ID } = require('../../config.json');
        function whichMember(ID) {
            const member = client.users.cache.get(ID);
            return member;
        }

        switch(todayDate) {
            case 'Apr 6':
                whichMember(AranhaBoladona_ID).send('Parabéns pelo aniversário! Querido criador do futuro! ❤');
            break;
            case 'Apr 15':
                whichMember(ilustraGra_ID).send('Parabéns pelo aniversário!');
            break;
            case '':
                whichMember().send('Parabéns pelo aniversário!');
            break;
        }
    }
}