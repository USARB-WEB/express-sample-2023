const Router = require('express')
const router = new Router()

const modules = ['students', 'specialities']

modules.forEach(module => {
    router.use(`/${module}`, require(`./${module}`))
})

module.exports = router