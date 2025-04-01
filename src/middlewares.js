import sharp from 'sharp';

export async function createThumbnail(req, res, next) {
  console.log('todo: tee kuvakäsittely', req.file);
  if (!req.file) {
    next('image not found in req');
    return;
  }

  let extension = '.jpg';
  if (req.file.mimetype === 'image/jpg') {
    extension = '.jpg';
  }
  if (req.file.mimetype === 'image/png') {
    extension = '.png';
  }

  await sharp(req.file.path)
    .resize({width: 100, height: 100})
    .toFile(`${req.file.path}_thumb${extension}`);

  next();
}
