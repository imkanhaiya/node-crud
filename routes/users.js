import express from 'express';
const router = express.Router() // Creates Fresh router instance
import { v4 as uuidv4 } from 'uuid';

let users = [
    {
        firstName: 'john',
        lastName: 'Doe',
        email: 'johndoe@test.com'
    },
    {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alicesmith@test.com'
    },
]

//sets the get route to respond to http get requests
router.get('/', (req, res) => {
    res.send(users);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find( (user) => user.id === id);
    res.send(foundUser)
})

//sets the post route
router.post('/', (req, res) => {
    const user = req.body;
    users.push( { ...user, id: uuidv4() } );
    res.send(`${user.firstName} has been added to the database`)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id) //Soft Delete
    res.send(`${id} deleted successfully from database`)
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = users.find( user => user.id === id);
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    res.send(`User with the ${id} has been updated`)
})

//Make this router available to be imported in other files
export default router;