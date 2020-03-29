const mongoose = require('mongoose');

const init = async () => {
    DATABASES = {
        cities: await mongoose.createConnection('mongodb://dbuser:CZcY6X32RsxO0HkuXAFE@142.44.210.106/cities', {useNewUrlParser: true, useUnifiedTopology: true}),
        users: await mongoose.createConnection('mongodb://dbuser:CZcY6X32RsxO0HkuXAFE@142.44.210.106/users', {useNewUrlParser: true, useUnifiedTopology: true}),
        quizzes: await mongoose.createConnection('mongodb://dbuser:CZcY6X32RsxO0HkuXAFE@142.44.210.106/quizzes', {useNewUrlParser: true, useUnifiedTopology: true})
    
    }
    console.log('Database connections established.');
}

exports.init = init;
