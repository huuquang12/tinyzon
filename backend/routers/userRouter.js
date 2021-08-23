import express from 'express';
import data from '../data.js'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
    })
);

export default userRouter;