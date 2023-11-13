const Doctor = require('../models/doctor');
const dotvenv = require('dotenv');

const connectDatabase = require('../configs/database');

const doctors = require('../data/doctor.json');

dotvenv.config({ path: 'backend/configs/config.env' });

connectDatabase();

const seedDoctors = async () => {
    try {
        await Doctor.deleteMany();
        console.log('Doctors are deleted');

        await Doctor.insertMany(doctors);
        console.log('All Doctors are added.');

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedDoctors();