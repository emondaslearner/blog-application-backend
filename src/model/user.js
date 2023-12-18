const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
			enum: ['pending', 'approved', 'disabled', 'rejected', 'deleted'],
			default: 'pending',
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'super_admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,
        strict: false,
        id: true
    }
)

const userModel = model('User', userSchema);

module.exports = userModel;