const assert = require('assert');

const Pokemon = require("./Pokemon");
const {error} = require('./Constants.js');
const DB = require('./Db');

;(async () => {
  //validating if the json file is empty
  {
    const pokemonItem = require('../mocks/emptyJson-invalid.json');
    const pokemon = new Pokemon(pokemonItem);
    const rejection = new Error(error.EMPTY_REQUIRED_PROPERTIES);
    const validationResult = pokemon.isValid();
    await assert.rejects(validationResult, rejection);
  }
  {
   const pokemonItem = require('../mocks/emptyTypesProperties-invalid.json');
   const pokemon = new Pokemon(pokemonItem);
   const rejection = new Error(error.EMPTY_TYPES_PROPERTY);
   const validationResult = pokemon.isValid();
   await assert.rejects(validationResult,rejection);
  }
  {
    const pokemonItem = require('../mocks/pokemonProperlyFilled-valid.json');
    const pokemon = new Pokemon(pokemonItem);
    const expected = new Pokemon({
      "name": "Pikachu",
      "types": ["eletric"],
      "skills": ["speed", "thunderstorm", "lightning"],
      "height": 60, 
      "weight": 40
    });
    await assert.doesNotReject(pokemon.isValid())
    assert.deepStrictEqual(pokemon, new Pokemon(expected));
  }
  //Validatind db creation
  {
    const db = new DB({path:'db.json'});
    const data = await db.init()
    assert.deepStrictEqual(data,db.getData());
  }
  //Validating an insert operation
  {
    const db = await new DB({ path: "db.json" });
    await db.init();
    const data = {
      name: "Pikachu",
      types: ["eletric"],
      skills: ["speed", "thunderstorm", "lightning"],
      height: 60,
      weight: 40,
    };
    const result = await db.insert({ collectionName: "pokemon", data });
    db.test();
    assert.deepStrictEqual(data,result);
  }
  //Validate an update operation
  {

  }
  //Validate an delete operation
  {

  }
  //Validate a list all operation
  {
    
  }
})();