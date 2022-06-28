import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        default: ''
    },
    storeDescription: {
        type: String,
        default: ''
    },
    coverURL: {
        type: String,
        default: '',
    },
    imageURL: {
        type: String,
        default: ''
    }
}, { timestamps: true });

let Store = mongoose.models.stores || mongoose.model('stores', storeSchema);
export default Store;