function convertToWebp(imageFile) {

    if (imageFile.size > 15728640) {
        iAlert().error('file_size_exceeds_15_MB')
        return;
    }
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onerror = () => reject(new Error('Failed to read the file'));

        reader.onload = function(e) {
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                try {
                    const dataUrl = canvas.toDataURL('image/webp', 0.9);
                    resolve(dataUrl);
                } catch (error) {
                    reject(new Error('Failed to convert image to WebP'));
                }
            };

            img.onerror = () => reject(new Error('Failed to load the image'));
            img.src = e.target.result;
        };

        reader.readAsDataURL(imageFile);
    });
}
export default convertToWebp