import sequelize from "../config/database.js";
import Patient from "./patient.js";
import Processed from "./processed.js";


const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized');
    } catch(error) {
        console.error('Error synchronizing database', error);
    }
}

export {
    Patient,
    Processed,
    syncDatabase,
}


