import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect(process.env.FMS_URI);

        console.log("MongoDB connection successful");
    } catch(error) {
        console.log("MongoDB connection failed");
        console.log(error);
    }
}

module.exports = {main};