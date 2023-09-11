const Router = require("express");
const router = new Router();
const specialitiesController = require('../controllers/SpecialitiesController');

router.get('/', async (req, res, next) => {    
    const results = await specialitiesController.getList
})
router.get('/:id', specialitiesController.getOne)
router.post('/', specialitiesController.create)
router.delete('/:id', specialitiesController.delete)
router.put('/:id', specialitiesController.update)


module.exports = router