const sequelize = require('../../db/index')
const { QueryTypes } = require('sequelize');
const studentsRepository = require('../repositories/StudentsRepository')

class StudentsService {
    async getList() {
        const students = await studentsRepository.getList();
        const studentSpecialities = await studentsRepository.getStudentSpecialities(students.map(student => student.id))

        return this.joinSpecialities(students, studentSpecialities)
    }

    joinSpecialities(students, studentSpecialities) {
        return students.map(student => {

            return {
                ...student,
                specialities: studentSpecialities[0]
                    .filter(studentSpeciality => studentSpeciality.student_id === student.id)
                    .map(student => {
                        return {
                            ...student,
                            student_id: undefined
                        }
                    })
            }
        })
    }

    async getOne(id) {
        const item = await studentsRepository.getOne(id)
        item.specialities = (await studentsRepository.getStudentSpecialities([id]));

        return item;
    }

    async create(item) {
        const insertedId = await studentsRepository.create(item)
        await studentsRepository.attachSpecialities(insertedId, item.specialities)

        return await this.getOne(insertedId)
    }

    async delete(id) {
        return await studentsRepository.delete(id)
    }

    async update(item, id) {
        try {
            await studentsRepository.update(item, id)
            await studentsRepository.detachSpecialities(id)
            await studentsRepository.attachSpecialities(id, item.specialities)

            return await this.getOne(insertedId)
        } catch (e) {

            return e;
        }
    }
}

module.exports = new StudentsService()