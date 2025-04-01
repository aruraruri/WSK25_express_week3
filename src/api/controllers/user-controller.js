import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const cat = await findUserById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

const deleteUser = async (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
