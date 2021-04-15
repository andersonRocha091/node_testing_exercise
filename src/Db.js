const { readFile, writeFile } = require('fs');

const {error} = require('./Constants');
class DB {
  constructor({ path }) {
    this.db = {};
    this.path = path;
  }

  async init() {
    return new Promise((resolve, reject) => {
      readFile(this.path, (err, data) => {
        let emptyData = JSON.stringify({}, null, 2);
        if (err) {
          writeFile(this.path, emptyData, (error) => {
            if (error) throw error;
            this.db = emptyData;
            resolve(this.db);
            console.log("Database created successfully!!");
          });
        }
        else{
          this.db = JSON.parse(data);
          resolve(this.db);
        }
      });
    });
  }

  getData() {
    return this.db;
  }
  
  async insert({ collectionName, data }) {
    return new Promise((resolve,reject) => {
      if (!this.db[collectionName] || this.db[collectionName] === undefined) {
        this.db[collectionName] = [];
      }
      this.db[collectionName].push(data);
      let dataToSave = JSON.stringify(this.db);
      return writeFile(this.path, dataToSave, (error) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  }
  
  async update(id,properties,collectionName){
    console.log('ID: ',id);
    return new Promise((resolve,reject)=>{
      const itemExists = this.db[collectionName].find((item)=>{
        item.id === id;
      });
      if(!itemExists) reject(new Error(error.OBJECT_NOT_FOUND));
    });
  }
}

module.exports = DB