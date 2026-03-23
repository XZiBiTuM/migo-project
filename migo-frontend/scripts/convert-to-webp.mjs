import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Root directory for images
const imagesDir = './public/images';

// Function to recursively find files in a directory
function getFiles(dir, files_) {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

// Function to convert images to webp
async function convertToWebp() {
  try {
    const files = getFiles(imagesDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.webp'];

    const conversionPromises = files
      .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map(async file => {
        const outputFilePath = file.replace(path.extname(file), '.webp');

        // Check if image is already webp and if skip it
        if (path.extname(file).toLowerCase() === '.webp') {
          console.log(`Skipped existing webp: ${file}`);
          return;
        }

        await sharp(file)
          .webp({ quality: 80 })
          .toFile(outputFilePath);

        console.log(`Converted: ${file} -> ${outputFilePath}`);
        
        // Remove the original file if conversion was successful
        fs.unlinkSync(file);
        console.log(`Removed: ${file}`);
      });

    await Promise.all(conversionPromises);
    console.log('Conversion completed successfully.');
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

convertToWebp();
