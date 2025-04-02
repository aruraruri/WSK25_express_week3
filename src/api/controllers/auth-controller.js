import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {login} from '../models/user-model.js';
import 'dotenv/config';

export const authUser = async (req, res) => {
  console.log('postLogin', req.body);
  const result = await login(req.body.username);
  console.log('user found!');
  if (!result) {
    console.log('user not found!');
    res.sendStatus(401);
    return;
  }
  const passwordValid = bcrypt.compareSync(req.body.password, result.password);
  if (!passwordValid) {
    console.log('password is valid', passwordValid);
    res.sendStatus(401);
    return;
  }
  console.log('password is valid', passwordValid);

  const userWithNoPassword = {
    user_id: result.user_id,
    name: result.name,
    username: result.username,
    email: result.email,
    role: result.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};
