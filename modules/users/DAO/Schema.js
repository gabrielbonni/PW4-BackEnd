import mongoose from 'mongoose';

var userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
    }
);

export default userSchema;