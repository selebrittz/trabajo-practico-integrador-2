import { Schema, model } from "mongoose";

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        trim: true,   // elimina espacios adelante y atrás
        minlength: 3,  // longitud mínima
        maxlength: 20, 
        required: true
    },
    email:{
        type: String,
        unique: true,
        match: /.+\@.+\..+/ 
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
  profile: {
      first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      biography:{
        type: String,
        maxlength: 500
      },
      avatarUrl: {
        type: String,
        match: /^(https?:\/\/[^\s$.?#].[^\s]*)$/
      },
      birthday:{
        type: Date
      },
    },
},
    { timestamps: true }
);

//virtual populate de articulos

UserSchema.virtual("article", {
    ref: "Article",
    localField: "_id",     // campo del usuario
    foreignField: "author" // campo del Article que referencia al usuario
});



export const UserModel= model("User", UserSchema)


// ● _id (ObjectId automático)
// ● username (String, único, 3-20 caracteres)
// ● email (String, único, formato válido)
// ● password (String, hasheada con bcrypt)
// ● role (String, enum: 'user', 'admin', default: 'user')
// ● profile (Documento embebido - relación 1:1):
// ○ firstName (String, 2-50 caracteres)
// ○ lastName (String, 2-50 caracteres)
// ○ biography (String, máximo 500 caracteres, opcional)
// ○ avatarUrl (String, formato URL, opcional)
// ○ birthDate (Date, opcional)
// ● createdAt (Date)
// ● updatedAt (Date)