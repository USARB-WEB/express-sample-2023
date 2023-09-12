const Router = require("express");
const router = new Router();

const studentsController = require('../controllers/StudentsController');

router.get('/', studentsController.getList)
router.get('/:id', studentsController.getOne)
router.post('/', studentsController.create)
router.delete('/:id', studentsController.delete)
router.put('/:id', studentsController.update)
//router.patch('/:id', studentsController.enrole)

module.exports = router