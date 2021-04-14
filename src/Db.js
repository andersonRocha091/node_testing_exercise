const { readFile, writeFile } = require('fs');

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
          console.log("data: ", this.db);
        }
      });
    });
  }

  getData() {
    return this.db;
  }

  getData() {
    return this.db;
  }

  async insert({ collectionName, data }) {
    return new Promise((resolve, reject) => {
      if (!this.db[collectionName] || this.db[collectionName] === undefined) {
        console.log("non-existent collection");
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
}

module.exports = DB