import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String, required: true, validate: {
            //custom error message
            validator: (v: string) => {
                return v.length >= 3
            },
            message: "Title must have more than 3 characters"
    } },
    text: { type: String },
  
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>

export default model<Note>("Note", noteSchema)