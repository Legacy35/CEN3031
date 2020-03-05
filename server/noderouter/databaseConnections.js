const mongoose = require('mongoose');

const init = async () => {
    DATABASES = {
        accidentReports: await mongoose.createConnection('mongodb://dbuser:CZcY6X32RsxO0HkuXAFE@142.44.210.106/accidentReports', {useNewUrlParser: true, useUnifiedTopology: true}),
        cities: await mongoose.createConnection('mongodb://dbuser:CZcY6X32RsxO0HkuXAFE@142.44.210.106/cities', {useNewUrlParser: true, useUnifiedTopology: true})
    }
    console.log('Database connections established.');
}

exports.init = init;
