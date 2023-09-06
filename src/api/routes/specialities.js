const Router = require("express");
const router = new Router();


  const specialities = [];
  let specialitiesCounter = 1;
  
  router.get('/', (request, response) => {
    response.send(specialities)
  })
  
  router.get('/:id', (request, response) => {
    const speciality = specialities.find(speciality => Number(request.params.id) === speciality.id)
    if (student) {
      response.send(student)
    } else {
      response.statusCode = 404;
      response.send();
    }
  })
  
  router.post('/', (request, response) => {
    const speciality = request.body
    speciality.id = specialitiesCounter++;
    specialities.push(speciality);
    response.send(request.body)
  })
  
  router.delete('/:id', (request, response) => {
    const specialityIndex = specialities.findIndex(speciality => speciality.id === Number(request.params.id))
    specialities.splice(specialityIndex, 1);
    response.send()
  })
  
  router.put('/:id', (request, response) => {
    const specialityIndex = specialities.findIndex(speciality => speciality.id === Number(request.params.id))
    const speciality = request.body;
    speciality.id = Number(request.params.id)
    specialities.splice(specialityIndex, 1, student)
    if (specialityIndex < 0) {
      response.statusCode = 404
      response.send()
    } else {
      response.send(specialities[specialityIndex])
    }
  })


module.exports = router