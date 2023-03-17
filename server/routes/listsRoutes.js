const exprees = require("express");
const router =  exprees.Router();

const listController = require("../controllers/listController");
const cardController = require("../controllers/cardController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .post(listController.createList)
    .patch(listController.updateList)
    .delete(listController.deleteList)
router.route("/card")
    .post(cardController.createCard)
    .patch(cardController.updateCard)
    .delete(cardController.deleteCard)

module.exports = router;