document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const loader = document.getElementById('loader');
  
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const files = fileInput.files;
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
  
        if (files.length === 0) {
            status.textContent = 'Please select images to upload.';
            return;
        } else if (files.length > 5) {
            status.textContent = 'Cannot upload more than 5 images at once.';
            return;
        }
  
        for (let file of files) {
            if (file.size > 5 * 1024 * 1024) {
                status.textContent = 'Each file must be smaller than 5 MB.';
                return;
            }
        }
  
        status.textContent = 'Validating files...';
        loader.style.display = 'block';
  
        const validGestures = {
            '1': 'L',
            '2': 'O',
            '3': 'V',
            '4': 'E',
            '6': 'LOVE'
        };
  
        for (let file of files) {
            const fileName = file.name.split('.')[0];
            if (!validGestures[fileName]) {
                status.textContent = `Invalid file name: ${file.name}. Please use valid gesture names.`;
                loader.style.display = 'none';
                return;
            }
        }
  
        const formData = new FormData();
        for (let file of files) {
            formData.append('images', file, file.name);  // Додаємо файл з іменем
        }
  
        status.textContent = 'Uploading files...';
  
        try {
            const response = await fetch('https://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTPS error! Status: ${response.status}`);
            }

            status.textContent = 'Processing recognition...';
  
            const data = await response.json();
            console.log('Server response:', data);  // Логування відповіді сервера
            status.textContent = 'Upload successful!';
            result.textContent = `Recognized Gestures: ${data.gestures.map(g => `${g.file}: ${g.gesture}`).join(', ')}`;
            successMessage.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            status.textContent = `Upload failed: ${error.message}`;
            errorMessage.style.display = 'block';
        } finally {
            loader.style.display = 'none';
        }
    });
});
