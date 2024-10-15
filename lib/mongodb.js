import mongoose from "mongoose";

const connectMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
        console.log("mongo error");
    }

}

export default connectMongoDB;