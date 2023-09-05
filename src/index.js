const express = require('express')
const app = express()
const port = 3000

const students = [
  {
      "id": 1,
      "idnp": "1234567890123",
      "first_name": "Ion",
      "last_name": "Creanga",
      "birth_date": "2000-12-23",
      "average_mark": 9.99,
      "residence_address": "mun. Balti, str. Puskin 38, aud. 516",
      "location_id": 1,
      "created_at": "2023-09-05 08:55:13",
      "created_by": 1
  },
  {
      "id": 2,
      "idnp": "1234567890123",
      "first_name": "Mihai",
      "last_name": "Eminescu",
      "birth_date": "2000-12-23",
      "average_mark": 9.99,
      "residence_address": "mun. Balti, str. Puskin 38, aud. 516",
      "location_id": 1,
      "created_at": "2023-09-05 08:55:13",
      "created_by": 1
  }
];

app.get('/students', (req, res) => {
  res.send(students)
})

app.get('/students/:id', (req, res) => {
  res.send(students.find(student => Number(req.params.id) === student.id))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})