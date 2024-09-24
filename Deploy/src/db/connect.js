import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import { config } from "dotenv";
config({
    path: "./.env",
});
const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONODB_URI}/${DB_NAME}`);
    }
    catch (error) {
        process.exit(1);
    }
};
export default connectionDB;
