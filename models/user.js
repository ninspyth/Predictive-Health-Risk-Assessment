import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            default: "",
        },
        userData: {
            type: Object,
            required: false,
            default: {}
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
