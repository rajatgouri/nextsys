const db = require('./database');

const collection = db.collection('roles');

exports.create = () => {
    let user = {
        _key: 'user',
        role: 'USER'
    };


    let admin = {
        _key: 'admin',
        role: 'ADMIN'
    };
    

    let superAdmin = {
        _key: 'super',
        role: 'SUPER'
    }
    


    collection.save(user).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );

    collection.save(admin).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );


    collection.save(superAdmin).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );


}