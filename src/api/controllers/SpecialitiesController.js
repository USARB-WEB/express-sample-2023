const db = require('../../db/query')
const items = [];
let counter = 1;

class SpecialitiesController {
   
    getList(request, response) {
        response.send(items)
    }

    getOne(request, response) {
        const item = items.find(item => Number(request.params.id) === item.id)
        if (item) {
            response.send(item)
        } else {
            response.statusCode = 404;
            response.send();
        }
    }

    create(request, response) {
        const item = request.body
        item.id = counter++;
        items.push(item);
        response.send(request.body)
    }

    delete(request, response) {
        const itemIndex = items.findIndex(item => item.id === Number(request.params.id))
        items.splice(itemIndex, 1);
        response.send()
    }

    update(request, response) {
        const itemIndex = items.findIndex(item => item.id === Number(request.params.id))
        const item = request.body;
        item.id = Number(request.params.id)
        items.splice(itemIndex, 1, item)
        if (itemIndex < 0) {
            response.statusCode = 404
            response.send()
        } else {
            response.send(items[itemIndex])
        }
    }
}

module.exports = new SpecialitiesController()