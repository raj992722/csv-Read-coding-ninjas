class CsvData {
    constructor(filename, data) {
      this.filename = filename;
      this.headers = Object.keys(data[0]);
      this.rows = data;
    }
  
    save() {
      CsvData.dataMap.set(this.filename, this);
    }
  
    static get(filename) {
      return CsvData.dataMap.get(filename);
    }
  }
  
  CsvData.dataMap = new Map();
  
  module.exports = CsvData;
  