const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads'});
const { tokenValidationMiddleware } = require('../middlewares/validateUser');

router.post('/upload', tokenValidationMiddleware, upload.single('file'), (req, res) => {
    const { filename, originalname, mimetype, path: tempPath } = req.file;
    const [name, extension] = originalname.split('.');
    const { document_prefix } = req.user;
    const newFileName = `${document_prefix}_${name}_${Date.now()}.${extension}`;

    const newPath = path.join(__dirname, '..', 'uploads', newFileName)
    fs.renameSync(tempPath, newPath);
    res.status(200).json({ filename: newFileName, path: newPath });
});

module.exports = router;