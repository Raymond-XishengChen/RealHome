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
    },
    avatar: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWO_H-9BZRJ1tpCNYmAJxw1m4wI73LuB6iw&usqp=CAU",
    }
}, { timestamps : true } );

const User = mongoose.model("User", userSchema);

export default User;