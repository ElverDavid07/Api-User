import { Schema, model, PaginateModel } from "mongoose";
import { User } from "../interfaces/user.interface";
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength:4
    },
    state:{
      type:String,
      trim:true,
      lowercase:true,
      enum:["active","inactive"],
      default:"active"
    }
  },
  { versionKey: false, timestamps: true }
);


userSchema.plugin(mongoosePaginate)
interface UserDocument extends User, Document {}

type UserModel = PaginateModel<UserDocument>;

const userModel: UserModel = model<UserDocument, UserModel>('users', userSchema);

export { userModel };

