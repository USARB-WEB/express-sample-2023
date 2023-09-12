const sequelize = require('../../db/index')
const { QueryTypes } = require('sequelize');

class StudentsRepository {
    async getList() {
        return await sequelize.query(
            `SELECT * FROM students`,
            { type: QueryTypes.SELECT }
        );
    }

    async getStudentSpecialities(studentIDs) {
        return await sequelize.query(
            `
            SELECT
                student_specialities.student_id,
                specialities.id,
                specialities.name
            FROM student_specialities, specialities
            WHERE
                student_specialities.student_id IN(${studentIDs.join(',')})
                AND
                student_specialities.speciality_id = specialities.id
            `
        )
    }

    async getOne(id) {
        const result = await sequelize.query(
            `SELECT * FROM students WHERE id = ${id}`,
            { type: QueryTypes.SELECT }
        )
        const item = result[0];
        return item;
    }

    async create(item) {
        try {
            const [insertedId, _] = await sequelize.query(
                `
                INSERT INTO students
                SET
                    idnp = '${item.idnp}',
                    first_name = '${item.first_name}',
                    last_name = '${item.last_name}',
                    birth_date = '${item.birth_date}',
                    average_mark = '${item.average_mark}',
                    residence_address = '${item.residence_address}',
                    location_id = '${item.location_id}'
                `,
                { type: QueryTypes.INSERT }
            )

            return insertedId
        } catch (e) {

            return 0;
        }
    }

    async attachSpecialities(studentId, specialities) {
        specialities.forEach(async (specialityId) => {
            await sequelize.query(
                `
                INSERT INTO student_specialities
                SET
                    student_id = '${studentId}',
                    speciality_id = '${specialityId}'
                `,
                { type: QueryTypes.INSERT }
            )
        });
    }

    async detachSpecialities(studentId) {
        await sequelize.query(`
            DELETE FROM student_specialities WHERE student_id = ${id}
        `)
    }

    async delete(id) {
        try {
            const [insertedId, _] = await sequelize.query(
                `DELETE FROM students WHERE id = ${id}`,
                { type: QueryTypes.DELETE }
            )

            return await this.getOne(insertedId)
        } catch (e) {

            return e;
        }
    }

    async update(item, id) {
        try {
            const [insertedId, _] = await sequelize.query(
                `UPDATE students
                SET
                    idnp = '${item.idnp}',
                    first_name = '${item.first_name}',
                    last_name = '${item.last_name}',
                    birth_date = '${item.birth_date}',
                    average_mark = '${item.average_mark}',
                    residence_address = '${item.residence_address}',
                    location_id = '${item.location_id}'
                WHERE id = ${id}
                `,
                { type: QueryTypes.INSERT }
            )

            await sequelize.query(`
                DELETE FROM student_specialities WHERE student_id = ${id}
            `)

            const specialities = item.specialities;
            specialities.forEach(async (specialityId) => {
                await sequelize.query(
                    `
                    INSERT INTO student_specialities
                    SET
                        student_id = '${id}',
                        speciality_id = '${specialityId}'
                    `,
                    { type: QueryTypes.UPDATE }
                )
            });

            return await this.getOne(id)
        } catch (e) {

            return e;
        }
    }
}

module.exports = new StudentsRepository()