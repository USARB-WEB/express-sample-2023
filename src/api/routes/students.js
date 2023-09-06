const Router = require("express");
const router = new Router();

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
  const students = [];
  let strudentsCounter = 1;
  
  router.get('/', (req, res) => {
    res.send(students.map(student => {
      return {
        ...student,
        specialities: student.specialities.map(specialityId => {
          return specialities.find(speciality => speciality.id === specialityId)?.name
        }),
        enroled_speciality: specialities.find(speciality => speciality.id === (student?.enroled_speciality || 0))?.name || undefined
      }
    }))
  })
  
  router.get('/:id', (request, response) => {
    const student = students.find(student => Number(request.params.id) === student.id)
    if (student) {
      response.send(student)
    } else {
      response.statusCode = 404;
      response.send();
    }
  })
  
  router.post('/', (request, response) => {
    const student = request.body
    student.id = strudentsCounter++;
    students.push(student);
    response.send(request.body)
  })
  
  router.delete('/:id', (request, response) => {
    const studentIndex = students.findIndex(student => student.id === Number(request.params.id))
    students.splice(studentIndex, 1);
    response.send()
  })
  
  router.put('/:id', (request, response) => {
    const studentIndex = students.findIndex(student => student.id === Number(request.params.id))
    const student = request.body;
    student.id = Number(request.params.id)
    students.splice(studentIndex, 1, student)
    if (studentIndex < 0) {
      response.statusCode = 404
      response.send()
    } else {
      response.send(students[studentIndex])
    }
  })
  
  router.patch('/:id', (request, response) => {
    const studentIndex = students.findIndex(student => student.id === Number(request.params.id))
    const student = students[studentIndex];
    student.enroled_speciality = request.body.speciality
    students.splice(studentIndex, 1, student)
    if (studentIndex < 0) {
      response.statusCode = 404
      response.send()
    } else {
      response.send(student)
    }
  })

module.exports = router