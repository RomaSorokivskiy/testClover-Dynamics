const Lists = require("../models/Lists");
const Cards = require("../models/Card");

const getList = async(req,res) => {
    const list = await Lists.find().lean();
    if (!list?.length) {
        return res.status(400).json({ message: 'No lists found' })
    }
    const lists = list
    res.json(lists)
}

const createList = async(req,res) => {
    const {user, cards,title,date} = req.body;
    if(!user) {
        return res.status(400).json({ message: 'Fields User required' });
    }
    const list = await Lists.create({user,cards,title,date});
    if(list) {
        return res.status(201).json({ message: 'New list created' });
    }else {
        return res.status(400).json({ message: 'Invalid list data received' })
    }
}

const updateList = async(req,res) =>{
    const {id, user,title} = req.body;

    const list = await Lists.findById(id).exec()

    if (!id || !user || !title) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    if (!list) {
        return res.status(400).json({ message: 'list not found' })
    }

    list.title = title;
    list.date = new Date();

    const updatedList = await list.save();
    res.json(`'${updatedList.title}' updated`)
}
const deleteList = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'list ID required' });
    }

    const list = await Lists.findById(id).exec();

    const card = await Cards.find({list}).exec();

    if (!list) {
        return res.status(400).json({ message: 'list not found' });
    }
    const correctCard = await card.filter(el => el.list !== id);
    const resultCard = correctCard.map((el) => el.deleteOne());
    const result = await list.deleteOne();
    // const reply = `list  '${result.title}' with ID ${result._id} deleted`;
    //
    res.json(result,resultCard);
}

module.exports = {
    getList,
    createList,
    updateList,
    deleteList
}