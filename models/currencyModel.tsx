import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    currency: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let Currency = mongoose.models.currencies || mongoose.model('currencies', currencySchema);
export default Currency;


