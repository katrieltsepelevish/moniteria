import Mongoose from 'mongoose';

const heartbeatSchema = new Mongoose.Schema(
  {
    monitorId: {
      required: true,
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Monitor',
    },
    status: {
      type: Number,
      required: true,
    },
    statusText: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    down: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  { timestamps: true }
);

export interface HeartbeatState {
  monitorId: string;
  status: number;
  statusText: string;
  duration: number;
  down: boolean;
}

export interface HeartbeatDocument extends HeartbeatState, Mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

export default Mongoose.model<
  HeartbeatDocument,
  Mongoose.Model<HeartbeatDocument>
>('Heartbeat', heartbeatSchema);
