import mongoose, { Schema } from 'mongoose'

const likeSchema = new mongoose.Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'recipe',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    session: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
)

likeSchema.index({ recipe: 1, user: 1 }, { unique: true })

export const Like = mongoose.model('like', likeSchema)
