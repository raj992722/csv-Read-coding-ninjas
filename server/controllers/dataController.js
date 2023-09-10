const CsvData = require('../models/csvData');

const displayData = (req, res) => {
  const { filename } = req.params;
  const csvData = CsvData.get(filename);

  if (!csvData) {
    return res.status(404).json({ error: 'File not found.' });
  }

  const { headers, rows } = csvData;
  res.status(200).json({ headers, rows });
};

module.exports = { displayData };
