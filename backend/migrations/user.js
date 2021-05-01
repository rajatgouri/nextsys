const db = require('./database');
const bcrypt = require('bcrypt');

const collection = db.collection('user');

exports.create = () => {
    let user = {
        _key: 'user2',
        role: 'roles/user',
        name: {
            firstName: 'Dummy',
            lastName: 'user'
        },
        userName : 'dummy',
        email: 'dummy@gmail.com',
        password: '123',
        picture: "images/img_avatar.png",
        background: "images/background-default.jpg"

    };

    let superAdmin = {
        _key: 'user1',
        role: 'roles/super',
        name: {
            firstName: 'Super',
            lastName: 'admin'
        },
        userName : 'admin',
        email: 'admin@admin.com',
        // Admin123@ is the password
        password: '$2b$10$a6zBy6OGT7oPvr.0pBeLcuDLAtLDqhNwI6vf0u6HVCGMLdlM7Uq2i',
        picture: "images/img_avatar.png",
        background: "images/background-default.jpg"
    };



    collection.save(user).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );

    collection.save(superAdmin).then(
        meta => console.log('Document saved:', meta._rev),
        err => console.error('Failed to save document:', err)
    );

    


}