const fs = require('fs');

// Мокові дані для розпізнавання жестів
const mockGestures = {
  "1": "L",
  "2": "O",
  "3": "V",
  "4": "E",
  "6": "LOVE",
};

// Основна функція розпізнавання жестів
exports.recognizeGestures = async (req, res) => {
  try {
    const files = req.files;  // Отримуємо файли з запиту
    if (!files || files.length === 0) {
      console.log('No files uploaded');
      return res.status(400).json({ message: 'No files uploaded' });
    }

    console.log('Uploaded files:', files);  // Логування файлів

    // Перевірка кожного файлу та його обробка
    const gestures = files.map(file => {
      const fileName = file.originalname.split('.')[0]; // Видаляємо розширення з назви файлу
      const recognizedGesture = mockGestures[fileName] || 'Unknown'; // Знаходимо жест або позначаємо його як "Невідомий"

      return {
        file: file.originalname,
        gesture: recognizedGesture
      };
    });

    // Відправляємо результат розпізнавання
    res.status(200).json({ gestures });
  } catch (error) {
    console.error('Error during recognition:', error);
    res.status(500).json({ message: 'Error occurred during recognition' });
  }
};
