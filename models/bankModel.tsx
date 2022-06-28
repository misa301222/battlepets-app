import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    currency: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let Bank = mongoose.models.banks || mongoose.model('banks', bankSchema);
export default Bank;


