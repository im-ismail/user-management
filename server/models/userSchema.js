const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, "Name can't be less than 3 characters"],
        maxLength: [30, "Name can't exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email already registered, enter another email'],
        lowerCase: true,
        validate: {
            validator: (v) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter valid email'
        }
    },
    phone: {
        type: String,
        required: [true, 'Number is required'],
        validate: {
            validator: (v) => {
                return /^(0|91)?[6-9][0-9]{9}$/.test(v);
            },
            message: 'Please enter valid phone number'
        }
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);