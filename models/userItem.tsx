import mongoose from "mongoose";

const userItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'items'
    },
    quantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let UserItem = mongoose.models.userItems || mongoose.model('userItems', userItemSchema);
export default UserItem;