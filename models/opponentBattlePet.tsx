import mongoose from "mongoose";

const opponentBattlePetSchema = new mongoose.Schema({
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
        default: 'Opponent'
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
        default: ['Attack', 'Defense', 'Heal']
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
    petType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'pettypes'
    },
    experienceGranted: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let OpponentBattlePet = mongoose.models.opponentbattlepets || mongoose.model('opponentbattlepets', opponentBattlePetSchema);
export default OpponentBattlePet;