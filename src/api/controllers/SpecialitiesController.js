const items = [];
let counter = 1;
const specialitiesService = require('../services/SpecialitiesService')

class SpecialitiesController {

    async getList(request, response) {
        try{
            response.send(await specialitiesService.getList())
        }catch(e){
            response.send(e);
        }
    }

    async getOne(request, response) {
        const item = await specialitiesService.getOne(Number(request.params.id))
        if (item) {
            response.send(item)
        } else {
            response.statusCode = 404;
            response.send();
        }
    }

    async create(request, response) {
        response.send(await specialitiesService.create(request.body))
    }

    async delete(request, response) {
        response.send(specialitiesService.delete(Number(request.params.id)))
    }

    async update(request, response) {
        response.send(await specialitiesService.update(request.body, Number(request.params.id)))
    }
}

module.exports = new SpecialitiesController()