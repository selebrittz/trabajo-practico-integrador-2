import { Schema, model } from "mongoose";

const commentSchema = new Schema ({
    content: {
        type: String,
        minLenght: 5,
        maxLenght: 500
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    },
},

   { timestamps: true }

);

export const CommentModel = model("Comment", commentSchema)

 
// ● _id (ObjectId automático)
// ● content (String, 5-500 caracteres)
// ● author (ObjectId, referencia a User)
// ● article (ObjectId, referencia a Article - relación 1:N)
// ● createdAt (Date)
// ● updatedAt (Date)