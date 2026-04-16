import mongoose from 'mongoose';

export interface ITask extends Document {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  date?: Date;
}

// для фронта ответ
export interface ITaskDTO {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  date?: string;
}

export const mapTaskToDTO = (task: ITask): ITaskDTO => {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    completed: task.completed,
    priority: task.priority,
    date: task.date?.toISOString(),
  };
};

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    priority: { type: Number, default: 4 },
    date: { type: Date }
  }/*,
  {
    toJSON: {
      transform: (doc, ret: any) => {
        if (ret.date) {
          ret.date = ret.date?.toISOString();
        }
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret: any) => {
        if (ret.date) {
          ret.date = ret.date.toISOString();
        }
        return ret;
      },
    },
  }*/
);

// taskSchema.virtual('id').get(function() {
//   return this._id.toString();
// });

export const TaskModel = mongoose.model('Task', taskSchema);

