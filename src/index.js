const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json({ extended: true }));
const port = 3000

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

app.get('/students', (req, res) => {
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

app.get('/students/:id', (request, response) => {
  const student = students.find(student => Number(request.params.id) === student.id)
  if (student) {
    response.send(student)
  } else {
    response.statusCode = 404;
    response.send();
  }
})

app.post('/students', (request, response) => {
  const student = request.body
  student.id = strudentsCounter++;
  students.push(student);
  response.send(request.body)
})

app.delete('/students/:id', (request, response) => {
  const studentIndex = students.findIndex(student => student.id === Number(request.params.id))
  students.splice(studentIndex, 1);
  response.send()
})

app.put('/students/:id', (request, response) => {
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

app.patch('/students/:id', (request, response) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})