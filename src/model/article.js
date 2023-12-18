const { Schema, model } = require('mongoose');

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        coverPhoto: String,
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
			enum: ['waiting for approval', 'rejected', 'approved', 'deleted'],
			default: 'waiting for approval',
        }
    },
	{ timestamps: true, id: true, strict: false }
);

const articleModel = model('Article', articleSchema);

module.exports = articleModel;