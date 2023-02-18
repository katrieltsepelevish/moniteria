import Jwt from 'jsonwebtoken';
import Mongoose from 'mongoose';

import config from '../config';

const UserSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordReset: {
      token: String,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = function () {
  return Jwt.sign({ _id: this._id }, config.jwtSecret, { expiresIn: '30d' });
};

UserSchema.statics.verifyToken = async function (token: string) {
  try {
    Jwt.verify(token, config.jwtSecret);

    const payload = Jwt.decode(token) as {
      _id: string;
    };

    const user = await this.findOne({
      _id: payload._id,
    });

    if (!user) {
      throw new Error('User is missing for token verification');
    }

    return user;
  } catch (error) {
    return null;
  }
};

export interface UserModel extends Mongoose.Model<UserDocument> {
  verifyToken: (token: string) => Promise<null | UserDocument>;
}

export interface UserDocument extends Mongoose.Document {
  generateToken: () => string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Mongoose.model<UserDocument, UserModel>('User', UserSchema);
