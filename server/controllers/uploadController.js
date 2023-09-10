const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const CsvData = require('../models/csvData');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  upload.single('csv')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file.' });
    }
    const filename = req.file.filename;
    const filePath = path.join(__dirname, `../uploads/${filename}`);
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const csvData = new CsvData(filename, results);
        csvData.save();
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File uploaded successfully.' });
      });
  });
};

module.exports = { uploadFile };
