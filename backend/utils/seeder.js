const Doctor = require('../models/doctor');
const Record = require('../models/record');
const User = require('../models/user');
const dotvenv = require('dotenv');

const connectDatabase = require('../configs/database');

const doctors = require('../data/doctor.json');
const records = require('../data/record.json');
const users = require('../data/user.json');

dotvenv.config({ path: 'backend/configs/config.env' });

connectDatabase();

const seedDoctors = async () => {
    try {
        await Doctor.deleteMany();
        console.log('Doctors are deleted');

        await Doctor.insertMany(doctors);
        console.log('All Doctors are added.');

        await Record.deleteMany();
        console.log('Records are deleted');
        await Record.insertMany(records);
        console.log('All Records are added.');

        await User.deleteMany();
        console.log('Users are deleted');
        await User.insertMany(users);
        console.log('All Users are added.');
        
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedDoctors();