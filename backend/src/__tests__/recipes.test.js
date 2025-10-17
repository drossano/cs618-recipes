import mongoose from 'mongoose'
import { describe, expect, test, beforeEach, beforeAll } from '@jest/globals'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'
import { Recipe as Recipe } from '../db/models/recipe.js'
import { createUser } from '../services/users.js'

let sampleRecipes = []
let testUser = null
let testUser2 = null
beforeAll(async () => {
  testUser = await createUser({ username: 'hello', password: 'world' })
  testUser2 = await createUser({ username: 'test', password: 'user2' })
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
      author: testUser._id,
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

describe('creating recipes', () => {
  test('with all parameters should succeed', async () => {
    const recipe = {
      name: 'Chicken Soup',
      ingredients:
        '1 lb chicken thigh\n2 tbsp oil\n1 onion\n2 carrots\n1 qt chicken stock',
      steps:
        'Remove chicken thigh from bone\n\nHeat oil in a pan and brown chicken and vegetables\n\nBring chicken stock to a boil\n\nAdd browned chicken and vegetables and cook for 3 hours',
      author: testUser._id,
      image:
        'https://cdn.pixabay.com/photo/2018/01/04/17/17/chicken-soup-3061166_960_720.jpg',
    }
    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundRecipe = await Recipe.findById(createdRecipe._id)
    expect(foundRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
  })
  test('without name should fail', async () => {
    const recipe = {
      author: testUser._id,
      ingredients: 'Recipe with no name',
      tags: ['empty'],
    }
    try {
      await createRecipe(testUser._id, recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`name` is required')
    }
  })
  test('should fail without author', async () => {
    const recipe = {
      name: 'Anonymous Recipe',
      contents: 'recipe with no author',
      tags: ['empty'],
    }
    try {
      await createRecipe(testUser._id, recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`author` is required')
    }
  })
  test('with minimal parameters should succeed', async () => {
    const recipe = {
      name: 'Only a name',
      author: testUser._id,
    }
    const createdRecipe = await createRecipe(testUser._id, recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
  test('should fail without user id', async () => {
    const recipe = {
      name: 'Anonymous recipe',
      ingredients: 'recipe with no author',
    }

    try {
      await createRecipe(recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError)
      expect(err.message).toContain('Cannot destructure property')
    }
  })
})

describe('listing recipes', () => {
  test('should return all recipes', async () => {
    const recipes = await listAllRecipes()
    console.log(recipes)
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })
  test('should return recipes sorted by creation date descending by default', async () => {
    const recipes = await listAllRecipes()
    const sortedSamplerecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSamplerecipes.map((recipe) => recipe.createdAt),
    )
  })
  test('should take into account provided sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplerecipes = createdSampleRecipes.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSamplerecipes.map((recipe) => recipe.updatedAt),
    )
  })
  // works on website but can't get test to work
  test('should be able to filter recipes by author', async () => {
    const recipes = await listRecipesByAuthor(testUser.username)
    expect(recipes.length).toBe(3)
  })
})

describe('getting a recipe', () => {
  test('should return full recipe', async () => {
    const recipe = await getRecipeById(createdSampleRecipes[0]._id)
    expect(recipe.toObject()).toEqual(createdSampleRecipes[0].toObject())
  })
  test('should fail if id doesnt exist', async () => {
    const recipe = await getRecipeById('000000000000000000000000')
    expect(recipe).toEqual(null)
  })
})

describe('updating recipes', () => {
  test('should update the specified property', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      ingredients: 'Test contents',
    })

    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.ingredients).toEqual('Test contents')
  })
  test('should not update other props', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      ingredients: 'Test contents',
    })

    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.name).toEqual('Chicken Soup')
    expect(updatedRecipe.steps).toEqual(
      'Remove chicken thigh from bone\n\nHeat oil in a pan and brown chicken and vegetables\n\nBring chicken stock to a boil\n\nAdd browned chicken and vegetables and cook for 3 hours',
    )
    expect(updatedRecipe.image).toEqual(
      'https://cdn.pixabay.com/photo/2018/01/04/17/17/chicken-soup-3061166_960_720.jpg',
    )
  })
  test('should update the updatedAt timestamp', async () => {
    await updateRecipe(testUser._id, createdSampleRecipes[0]._id, {
      contents: 'Test contents',
    })

    const updatedrecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedrecipe.updatedAt.getTime()).toBeGreaterThan(
      createdSampleRecipes[0].updatedAt.getTime(),
    )
  })
  test('should fail if user id doesnt exist', async () => {
    ;async () => {
      const recipe = await updateRecipe(
        '000000000000000000000000',
        '000000000000000000000000',
        {
          contents: 'Test contents',
        },
      )
      expect(recipe).toEqual(null)
    }
  })
  test('should fail if user & recipe ids dont exist', async () => {
    ;async () => {
      const recipe = await updateRecipe(
        '000000000000000000000000',
        createdSampleRecipes[0]._id,
        {
          contents: 'Test contents',
        },
      )
      expect(recipe).toEqual(null)
    }
  })
  test('should fail if recipe id doesnt exist', async () => {
    ;async () => {
      const recipe = await updateRecipe(
        testUser._id,
        '000000000000000000000000',
        {
          contents: 'Test contents',
        },
      )
      expect(recipe).toEqual(null)
    }
  })
  test("shouldn't update if edited by a different user", async () => {
    await updateRecipe(testUser2._id, createdSampleRecipes[0]._id, {
      contents: 'not my recipe',
    })
    const updatedRecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(updatedRecipe.name).toEqual('Chicken Soup')
  })
})

describe('deleting recipes', () => {
  test('should remove the recipe from the database', async () => {
    const result = await deleteRecipe(testUser._id, createdSampleRecipes[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedrecipe = await Recipe.findById(createdSampleRecipes[0]._id)
    expect(deletedrecipe).toEqual(null)
  })
  test('should fail if the user  doesnt not exist', async () => {
    const result = await deleteRecipe(
      '000000000000000000000000',
      createdSampleRecipes[0]._id,
    )
    expect(result.deletedCount).toEqual(0)
  })
  test('should fail if the recipe ids doesnt not exist', async () => {
    const result = await deleteRecipe(testUser._id, '000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
  test('should fail if the user and recipe ids dont not exist', async () => {
    const result = await deleteRecipe(
      '000000000000000000000000',
      '000000000000000000000000',
    )
    expect(result.deletedCount).toEqual(0)
  })
  test('should fail if deleted by different user does not exist', async () => {
    const result = await deleteRecipe(
      testUser2._id,
      createdSampleRecipes[0]._id,
    )
    expect(result.deletedCount).toEqual(0)
  })
})
