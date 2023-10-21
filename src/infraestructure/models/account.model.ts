import mongoose from "mongoose";
import { Model } from "./model";
import { config } from "@/config";

const connection = config.database.account.connection;

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
})

const collection = "account";

export const AccountModel = Model({
  connection,
  schema,
  collection,
})