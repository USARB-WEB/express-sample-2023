class StudentsController {
    students = [];
    counter = 1;
    specialities = [
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

    getList(request, response) {
        response.send(
            this.students.map(student => {
                return {
                    ...student,
                    specialities: student.specialities.map(specialityId => {
                        return specialities.find(speciality => speciality.id === specialityId)?.name
                    }),
                    enroled_speciality: specialities.find(speciality => speciality.id === (student?.enroled_speciality || 0))?.name || undefined
                }
            })
        )
    }

    getOne(request, response) {
        const student = students.find(student => Number(request.params.id) === student.id)
        if (student) {
            response.send(student)
        } else {
            response.statusCode = 404;
            response.send();
        }
    }

    create(request, response) {
        const student = request.body
        student.id = counter++;
        students.push(student);
        response.send(request.body)
    }

    delete(request, response) {
        const studentIndex = students.findIndex(student => student.id === Number(request.params.id))
        students.splice(studentIndex, 1);
        response.send()
    }

    update(request, response) {
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
    }

    enrole(request, response) {
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
    }
}


module.exports = new StudentsController()