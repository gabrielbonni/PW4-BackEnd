import mongoose from 'mongoose';
import discSchema from './schema/discSchema';

export const Disc = mongoose.model('Disc', discSchema);