import { Schema, model  } from "mongoose";

const tagSchema = new Schema ({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
      match: /^[^\s]+$/,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true,
      default: "",
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article", // muchos artículos por tag
      }
    ],
  },
  { timestamps: true }
);

export const TagModel = model("Tag", tagSchema);



// ● _id (ObjectId automático)
// ● name (String, único, 2-30 caracteres, sin espacios)
// ● description (String, opcional, máximo 200 caracteres)
// ● createdAt (Date)
// ● updatedAt (Date)