import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        default: ''
    },
    itemDescription: {
        Type: String,
        default: ''
    },
    itemPrice: {
        Type: Number,
        default: 0
    },
    itemRarity: {
        Type: Number,
        default: 0
    },
    itemType: {
        Type: String,
        default: ''
    },
    imageURL: {
        Type: String,
        default: ''
    }
}, { timestamps: true });

let Item = mongoose.models.items || mongoose.model('items', itemSchema);
export default Item;