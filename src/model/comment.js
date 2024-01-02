const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        article: {
            type: Schema.ObjectId,
            ref: 'Article'
        },
        body: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['deleted', 'public', 'private'],
            default: 'public'
        }
    },
	{ timestamps: true, id: true, strict: false }
);


const commentModel = model('Comment', commentSchema);

module.exports = commentModel;