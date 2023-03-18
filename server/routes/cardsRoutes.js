const exprees = require("express");
const router =  exprees.Router();

const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);


const cardController = require("../controllers/cardController");
router.route("/")
    .get(cardController.getCards)
    .post(cardController.createCard)
    .patch(cardController.updateCard)
    .delete(cardController.deleteCard)

module.exports = router;