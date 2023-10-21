import mongoose from "mongoose";

// Set up model for users
// with unique user name and email address.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamp : true } );

const User = mongoose.model("User", userSchema);

export default User;