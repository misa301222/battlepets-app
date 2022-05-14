import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    descriptionHeader: {
        type: String,
        defaults: 'This is a header'
    },
    description: {
        type: String,
        defaults: 'This is a description'
    },
    hobbies: {
        type: [String],
        defaults: ''
    },
    imagesURL: {
        type: [String],
        defaults: ''
    },
    coverURL: {
        type: String,
        defaults: ''
    },
    location: {
        type: String,
        defaults: ''
    }
}, { timestamps: true });

let UserProfile = mongoose.models.userprofiles || mongoose.model('userprofiles', userProfileSchema);
export default UserProfile;