import Mongoose from 'mongoose';

export enum MonitorTypes {
  HTTP = 'http',
}

const monitorSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['http'],
      required: true,
    },
    heartbeatInterval: {
      type: Number,
      required: true,
    },
    reachable: {
      type: Boolean,
      require: false,
      default: true,
    },
    uptime: {
      type: Number,
      required: false,
      default: 0,
    },
    downtime: {
      type: Number,
      required: false,
      default: 0,
    },
    retries: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      require: false,
      default: true,
    },
  },
  { timestamps: true }
);

export interface MonitorDocument extends Mongoose.Document {
  name: String;
  uri: String;
  type: MonitorTypes.HTTP;
  heartbeatInterval: Number;
  reachable: Boolean;
  uptime: Number;
  downtime: Number;
  retries: Number;
  active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default Mongoose.model<MonitorDocument, Mongoose.Model<MonitorDocument>>(
  'Monitor',
  monitorSchema
);
