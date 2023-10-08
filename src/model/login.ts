import { InferSchemaType, Schema, model } from "mongoose";

const loginSchema = new Schema({
    email: {
        type: String, required: true, validate: (email: string) => {
            const emailRegex = /^.+@(?:[\w-]+\.)+\w+$/
            return emailRegex.test(email)
    } },
    password: { type: String, required: true },
}, { timestamps: true });

type loginSchema = InferSchemaType<typeof loginSchema>

export default model<loginSchema>("login", loginSchema)