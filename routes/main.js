const router = require("express").Router();
const mainController = require("../controllers/mainController")

router.get('/',mainController.home);
router.get('/servicios', mainController.servicios)

module.exports = router;