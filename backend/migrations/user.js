const db = require('./database');

const collection = db.collection('user');

exports.create = () => {
    let user = {
        _key: 'user1',
        role: 'roles/user',
        name: {
            firstName: 'Dummy',
            lastName: 'user'
        },
        email: 'dummy@gmail.com',
        password: '123'

    };



    collection.save(user).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );

    


}