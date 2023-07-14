const UserModel = require('../models/userSchema');

// fetching all user
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select({ _id: 1, name: 1 });
        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: 'No user found'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

// adding new user
const createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.findOne({ phone });
        };
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'User with same email or phone is already exist'
            });
        };
        const newUser = new UserModel({
            name, email, phone
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

// fetching user by id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

//updating user by id
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phone } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { name, email, phone }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'Updation failed, user not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

//deleting user id
const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserModel.findByIdAndRemove(userId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Deletion failed, user not found'
            });
        };
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

module.exports = { getAllUsers, createUser, getUserById, updateUserById, deleteUserById };