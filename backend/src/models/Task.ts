import mongoose from 'mongoose';

export interface ITask extends Document {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  date?: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: Number, default: 4 },
  date: { type: Date },
});

taskSchema.virtual('id').get(function() {
  return this._id.toString();
});

export const TaskModel = mongoose.model('Task', taskSchema);
