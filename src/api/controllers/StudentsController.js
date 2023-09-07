const items = [];
let counter = 1;
const specialities = [
    {
        id: 1,
        name: "Informatica"
    },
    {
        id: 2,
        name: "Muzica"
    },
    {
        id: 3,
        name: "Economie"
    }
]
class StudentsController {
   
    getList(request, response) {
        response.send(items.map(item => {
            return {
                ...item,
                specialities: item.specialities.map(specialityId => {
                    return specialities.find(speciality => speciality.id === specialityId)?.name
                }),
                enroled_speciality: specialities.find(speciality => speciality.id === (item?.enroled_speciality || 0))?.name || undefined
            }
        }))
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

    enrole(request, response) {
        const itemIndex = items.findIndex(item => item.id === Number(request.params.id))
        const item = items[itemIndex];
        item.enroled_speciality = request.body.speciality
        items.splice(itemIndex, 1, item)
        if (itemIndex < 0) {
            response.statusCode = 404
            response.send()
        } else {
            response.send(item)
        }
    }
}

module.exports = new StudentsController()