import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    ingredients: String,
    steps: String,
    image: String,
  },
  { timestamps: true },
)

export const Recipe = mongoose.model('post', recipeSchema)
