import mongoose from "mongoose";

const petTypeSchema = new mongoose.Schema({
    petTypeName: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String,
        default: ''
    },
    petTypeDescription: {
        type: String,
        default: ''
    }
}, { timestamps: true });

let PetType = mongoose.models.pettypes || mongoose.model('pettypes', petTypeSchema);
export default PetType;