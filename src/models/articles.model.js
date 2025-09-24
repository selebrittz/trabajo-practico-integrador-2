import { Schema, model } from "mongoose";

const articleSchema = new Schema ({
 title: {
    type: String,
    minLenght: 3,
    maxLenght: 200,
    required: true
 },
 content: {
    type: String,
    minLenght: 50,
    required: true
 },
 excerpt: {
    type:String,
    minLenght: 500
 },
 status: {
    type:String,
    enum:[ "published", "archived"],
    default: "published"

 },

 //relacion de 1: m
 author: {
   type: Schema.Types.ObjectId,
   ref:"User", // referencia al modelo User
   required: true,
 },
 
 // relacion de n:m
 tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag", // referencia al modelo Tag
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ArticleModel = model("Article", articleSchema);





// ● _id (ObjectId automático)
// ● title (String, 3-200 caracteres)
// ● content (String, mínimo 50 caracteres)
// ● excerpt (String, máximo 500 caracteres, opcional)

// ● status (String, enum: 'published', 'archived', default: 'published')
// ● author (ObjectId, referencia a User)
// ● tags (Array de ObjectIds, referencias a Tag - relación N:M)
// ● createdAt (Date)
// ● updatedAt (Date)