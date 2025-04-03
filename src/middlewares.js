import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import promisePool from './utils/database.js';

async function createThumbnail(req, res, next) {
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

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
    console.log(err);
  }
};

async function catOwnerCheck(req, res, next) {
  console.log(req);
  const sql = promisePool.format(`SELECT *  FROM wsk_cats WHERE cat_id = ?`, [
    req.cat_name,
  ]);
  console.log(sql);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].owner === req.id) {
    console.log('matching ids');
  }

  next();
}

export {authenticateToken, createThumbnail, catOwnerCheck};
