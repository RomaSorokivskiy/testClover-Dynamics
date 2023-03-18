const exprees = require("express");
const router =  exprees.Router();

const listController = require("../controllers/listController");
const cardController = require("../controllers/cardController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.route("/")
    .get(listController.getList)
    .post(listController.createList)
    .patch(listController.updateList)
    .delete(listController.deleteList)

module.exports = router;