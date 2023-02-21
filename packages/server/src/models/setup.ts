import Mongoose from 'mongoose';

const SetupSchema = new Mongoose.Schema(
  {
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export interface SetupDocument extends Mongoose.Document {
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default Mongoose.model<SetupDocument, Mongoose.Model<SetupDocument>>(
  'Setup',
  SetupSchema
);
