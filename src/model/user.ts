import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String,  }
})

type User = InferSchemaType<typeof userSchema>

export default model<User>("User", userSchema)