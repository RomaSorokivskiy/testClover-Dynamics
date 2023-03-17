const Cards = require("../models/Card");

const createCard = async(req,res) => {
    const {list,title,description} = req.body;

    if(!list) {
        return res.status(400).json({ message: 'Fields List required' });
    }
    const card = await Cards.create({list,title,description});

    if(card) {
        return res.status(201).json({ message: 'New card created' });
    }else {
        return res.status(400).json({ message: 'Invalid card data received' })
    }
}
const updateCard = async(req,res) => {
    const {id,list,title,description} = req.body;

    const card = await Cards.findById(id).exec()

    if (!id || !list || !title || description) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    if (!card) {
        return res.status(400).json({ message: 'Card not found' })
    }

    card.list = list;
    card.title = title;
    card.description = description;
    card.date = new Date();
}
const deleteCard = async(req,res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Card ID required' });
    }

    const card = await Cards.findById(id).exec();

    if (!card) {
        return res.status(400).json({ message: 'Card not found' });
    }

    const result = await card.deleteOne();

    const reply = `Card  '${result.title}' with ID ${result._id} deleted`;

    res.json(reply);
}

module.exports = {
    createCard,
    updateCard,
    deleteCard
}