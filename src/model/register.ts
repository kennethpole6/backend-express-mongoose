import { InferSchemaType, Schema, model } from "mongoose";

const registerSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})

type RegisterSchema = InferSchemaType<typeof registerSchema>

export default model<RegisterSchema>("register", registerSchema)