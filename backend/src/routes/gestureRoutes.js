const express = require('express');
const multer = require('multer');
const gestureController = require('../controllers/gestureController');

const router = express.Router();

// Налаштування Multer для обробки файлів і перевірки типу
const upload = multer({
    dest: 'uploads/',  // Місце для збереження файлів
    limits: { fileSize: 5 * 1024 * 1024 },  // Обмеження на розмір файлу (5 MB)
    fileFilter: (req, file, cb) => {
        // Перевірка типу файлу
        const fileTypes = /jpeg|jpg|png|gif/; // Приймаємо лише зображення
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(file.originalname.toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);  // Файл валідний
        } else {
            return cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
    }
}).array('images');  // Обробляємо масив файлів з ключем 'images'

// Маршрут для обробки POST запиту на завантаження файлів
router.post('/api/upload', upload, gestureController.recognizeGestures);

module.exports = router;
