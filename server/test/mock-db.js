/**
 * ⚠️ DO NOT EDIT THIS FILE ⚠️
 */
import Datastore from 'nedb-promise';

const TEST_RECIPE_DB_PATH = '/tmp/test-recipes.json';
const TEST_INGREDIENTS_DB_PATH = '/tmp/test-ingredients.json';

const recipeDb = new Datastore({
  filename: TEST_RECIPE_DB_PATH,
  autoload: true
});
const ingredientDb = new Datastore({
  filename: TEST_INGREDIENTS_DB_PATH,
  autoload: true
});

const setup = () =>
  Promise.all([
    ingredientDb.insert([
      {
        _id: 'asdf123',
        name: 'Salad'
      },
      {
        _id: 'asdf234',
        name: 'Salad dressing'
      },
      {
        _id: '123asdf',
        name: 'Beef'
      },
      {
        _id: '234asdf',
        name: 'Chicken'
      }
    ]),
    recipeDb.insert([
      {
        _id: '1-recipe',
        title: 'Wiener Schnitzel',
        vegetarian: false,
        ingredients: ['123asdf', 'asdf123', 'asdf234'],
        preparation: ['Get ingredients', 'Put beef into pan', 'Enjoy']
      },
      {
        _id: '2-recipe',
        title: 'Caesar Salad',
        vegetarian: false,
        ingredients: ['234asdf', 'asdf123', 'asdf234'],
        preparation: ['Get ingredients', 'Put them all in a bowl', 'Enjoy']
      },
      {
        _id: '3-recipe',
        title: 'Salad',
        vegetarian: true,
        ingredients: ['asdf123', 'asdf234'],
        preparation: ['Get ingredients', 'Put them all in a bowl', 'Enjoy']
      }
    ])
  ]);

const teardown = () => {
  return Promise.all([
    recipeDb.remove({}, { multi: true }),
    ingredientDb.remove({}, { multi: true })
  ]);
};

const mockDb = { ingredientDb, recipeDb };
export { setup, teardown, mockDb };
