class BaseCrud{
  constructor({db}){
    this.db = db
  }
  
  getData() {
    return this.db;
  }

  add(){

  }
  remove(){
    
  }
  update(){

  }
  list(){

  } 
}

module.exports = BaseCrud;