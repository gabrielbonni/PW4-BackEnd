import mongoose from 'mongoose';

const discSchema = new mongoose.Schema({
    id: Number,
    name: String,
    composer: String
});

export default discSchema;