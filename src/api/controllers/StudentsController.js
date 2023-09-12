const items = [];
let counter = 1;
const studentsService = require('../services/StudentsService')

class StudentsController {

    async getList(request, response) {
        try{
            response.send(await studentsService.getList())
        }catch(e){
            response.send(e);
        }
    }

    async getOne(request, response) {
        const item = await studentsService.getOne(Number(request.params.id))
        if (item) {
            response.send(item)
        } else {
            response.statusCode = 404;
            response.send();
        }
    }

    async create(request, response) {
        response.send(await studentsService.create(request.body))
    }

    async delete(request, response) {
        response.send(studentsService.delete(Number(request.params.id)))
    }

    async update(request, response) {
        response.send(await studentsService.update(request.body, Number(request.params.id)))
    }
}

module.exports = new StudentsController()