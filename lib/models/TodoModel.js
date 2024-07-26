import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, 'Please provide a title'],
        },
        description: {
                type: String,
                required: [true, 'Please provide a description'],
        },
        isCompleted: {
                type: Boolean,
                default: false
        },

}, { timestamps: true });

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
