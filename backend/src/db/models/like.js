import mongoose, { Schema } from 'mongoose'

const likeSchema = new Schema(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'recipe', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true },
)

export const Recipe = mongoose.model('recipe', likeSchema)
