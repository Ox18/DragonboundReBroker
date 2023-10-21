import mongoose from "mongoose";
import { Model } from "./model";
import { User } from "@/domain/models/user.model";
import { config } from "@/config";

const connection = config.database.user.connection;

const schema = new mongoose.Schema({
  nickname: String,
  rank: Number,
  country: String,
  account: String,
  gp: Number,
  gold: Number,
  cash: Number,
})

const collection = "users";

export const UserModel = Model<User>({
  connection,
  schema,
  collection,
})