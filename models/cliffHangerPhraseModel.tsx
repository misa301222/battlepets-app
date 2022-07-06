import mongoose from "mongoose";

const cliffHangerPhraseSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        default: ''
    },
    phrase: {
        type: String,
        default: ''
    }
}, { timestamps: true });

let CliffHangerPhrase = mongoose.models.cliffhangerphrases || mongoose.model('cliffhangerphrases', cliffHangerPhraseSchema);
export default CliffHangerPhrase;