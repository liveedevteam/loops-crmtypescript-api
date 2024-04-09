import { model, Schema } from "mongoose";

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
        enum: ["event", "station"],
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const AuthsModel = model("Auths", authSchema);

export default AuthsModel;