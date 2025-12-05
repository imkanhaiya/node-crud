import express from 'express';
const router = express.Router() // Creates Fresh router instance
import { v4 as uuidv4 } from 'uuid';
import user from '../models/users.js'

//sets the get route to respond to http get requests
router.get('/', async(req, res) => {
    const users = await user.find()
    res.json(users);
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const foundUser = await user.findById(id);
    res.json(foundUser)
})

//sets the post route
router.post('/', async(req, res) => {
    try {
        const { firstName, lastName, email} = req.body;
        const newUser = await user.create( { firstName, lastName, email});
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({message: 'Could not create user', error: err.message})
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const deleteUser = await user.findByIdAndDelete(id)
    res.json(`${id} deleted successfully from database`)
})

router.patch('/:id', async(req, res) => {
    const { id } = req.params;
    const updates = req.body
    const updateUser = await user.findByIdAndUpdate(id, updates, { new: true, runValidators: true});

    if (!updateUser) return res.status(404).json({message: 'User not found'})

    res.json(updateUser);
})

//Make this router available to be imported in other files
export default router;