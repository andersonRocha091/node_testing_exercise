const BaseCrud = require('./BaseCrud.js');
const { error } = require('./Constants.js');

class Pokemon extends BaseCrud {
  constructor({ name, types = [], height = 0, weight = 0, skills = [], db }) {
    super({db: db});
    this.name = name;
    this.types = types;
    this.height = height;
    this.weight = weight;
    this.skills = skills;
  }

  async isValid() {
    const AllRequiredPropertiesFilled = this.name && this.skills && this.types;
    const emptyTypesProperty = this.types.length == 0;
    if (AllRequiredPropertiesFilled === undefined) {
      throw new Error(error.EMPTY_REQUIRED_PROPERTIES);
    }
    if(emptyTypesProperty){
      throw new Error(error.EMPTY_TYPES_PROPERTY);
    }
    return {
      valid: true,
    };
  }
}

module.exports = Pokemon;