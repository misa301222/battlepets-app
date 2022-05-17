import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    currentHealthPoints: {
        type: Number,
        default: 11
    },
    maxHealthPoints: {
        type: Number,
        default: 11
    },
    name: {
        type: String,
        default: 'Name Your Pet'
    },
    attackPoints: {
        type: Number,
        default: 8
    },
    defensePoints: {
        type: Number,
        default: 5
    },
    agilityPoints: {
        type: Number,
        default: 3
    },
    currentMagicPoints: {
        type: Number,
        default: 15
    },
    maxMagicPoints: {
        type: Number,
        default: 15
    },
    availableAttacks: {
        type: [String],
        default: ['Attack', 'Defense', 'Heal', 'Skip']
    },
    level: {
        type: Number,
        default: 1
    },
    imageURL: {
        type: String,
        default: ''
    },
    customImageURL: {
        type: String,
        default: ''
    },
    wins: {
        type: Number,
        default: 0
    },
    defeats: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    },
    petType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'pettypes'
    }
}, { timestamps: true });

let Pet = mongoose.models.pets || mongoose.model('pets', petSchema);
export default Pet;