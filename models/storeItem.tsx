import mongoose from "mongoose";

const storeItemSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'stores'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'items'
    },
    quantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let StoreItem = mongoose.models.storeItems || mongoose.model('storeItems', storeItemSchema);
export default StoreItem;