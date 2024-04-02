import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// Users Database Schema (MongoDB)
const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"],
        required: true,
        unique: true
    },
    profile: {
        firstName: {
            type: String,
            match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"],
        },
        lastName: {
            type: String,
            match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"],
        },
        address: {
            street1: String,
            street2: String,
            city: String,
            country: String,
            zip: String
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
}, {
    timestamps: true
});

// Bcrypt password hashing before saving to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        // const salt = await bcrypt.genSalt(10); i don't need salt! i can define it in the next line as 10 (good practice)
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", UserSchema);

export default User;