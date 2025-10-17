import mongoose from 'mongoose'
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import { likeRecipe } from '../services/likes.js'
import { Recipe as Recipe } from '../db/models/recipe.js'
import { Like } from '../db/models/like.js'
import { createUser } from '../services/users.js'

let sampleRecipes = []
let testUser = null
let testUser2 = null
beforeAll(async () => {
  testUser = await createUser({ username: 'liker1', password: 'liker1' })
  testUser2 = await createUser({ username: 'liker2', password: 'liker2' })
  sampleRecipes = [
    {
      name: 'Chicken Soup',
      ingredients:
        '1 lb chicken thigh\n2 tbsp oil\n1 onion\n2 carrots\n1 qt chicken stock',
      steps:
        'Remove chicken thigh from bone\n\nHeat oil in a pan and brown chicken and vegetables\n\nBring chicken stock to a boil\n\nAdd browned chicken and vegetables and cook for 3 hours',
      author: testUser._id,
      image:
        'https://cdn.pixabay.com/photo/2018/01/04/17/17/chicken-soup-3061166_960_720.jpg',
    },
    {
      name: 'Ham Sandwich',
      ingredients: '4 oz ham\n2 slices of bread',
      steps:
        'Place ham on one slice of bread\n\nPlace second slice on top\n\nCut diagonally into two triangles. THIS STEP IS CRUCIAL',
      author: testUser._id,
      image:
        'https://cdn.pixabay.com/photo/2018/09/29/04/15/club-sandwich-3710738_960_720.jpg',
    },
    {
      name: 'Coleslaw',
      ingredients:
        '1 head of cabbage\n2 carrots\n3/4 cup mayonnaise\n1 tbsp sugar\n2tbsp of vinegar\nSalt\nPepper',
      steps:
        'Shred cabbage and carrots into a large bowl\n\nWhisk together mayonnaise, sugar and vinegar\n\nAdd mixture to vegetables and mix\n\nAdd salt and pepper to taste.',
      author: testUser2._id,
      image:
        'https://cdn.pixabay.com/photo/2016/02/26/11/04/appetizer-1223853_960_720.jpg',
    },
  ]
})

let createdSampleRecipes = []
beforeEach(async () => {
  await Recipe.deleteMany({})
  createdSampleRecipes = []
  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)

    createdSampleRecipes.push(await createdRecipe.save())
  }
})

describe('liking recipes', () => {
  test('should succeed if user doesnt currently like recipe', async () => {
    const testLike = await likeRecipe(testUser._id, {
      recipeId: createdSampleRecipes[0]._id,
    })
    expect(testLike._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundLike = await Like.findById(testLike._id)
    expect(foundLike._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
  test('should succeed if same user likes two different recipes', async () => {
    const testLike1 = await likeRecipe(testUser._id, {
      recipeId: createdSampleRecipes[0]._id,
    })
    const testLike2 = await likeRecipe(testUser._id, {
      recipeId: createdSampleRecipes[1]._id,
    })
    const foundLike1 = await Like.findById(testLike1._id)
    expect(foundLike1._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundLike2 = await Like.findById(testLike2._id)
    expect(foundLike2._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
  test('should succeed if two different users like same recipe', async () => {
    const testLike1 = await likeRecipe(testUser._id, {
      recipeId: createdSampleRecipes[0]._id,
    })
    const testLike2 = await likeRecipe(testUser2._id, {
      recipeId: createdSampleRecipes[1]._id,
    })
    const foundLike1 = await Like.findById(testLike1._id)
    expect(foundLike1._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundLike2 = await Like.findById(testLike2._id)
    expect(foundLike2._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
  test('should fail if user currently likes recipe', async () => {
    try {
      await likeRecipe(testUser._id, {
        recipeId: createdSampleRecipes[0]._id,
      })
      await likeRecipe(testUser._id, {
        recipeId: createdSampleRecipes[0]._id,
      })
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.mongo.MongoServerError)
      expect(err.message).toContain('duplicate key')
    }
  })
})
