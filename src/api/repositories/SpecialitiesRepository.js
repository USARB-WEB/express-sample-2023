const sequelize =  require('../../db/index')
const { QueryTypes } = require('sequelize');

class SpecialitiesRepository{
    async getList() {
        return await sequelize.query(
            `SELECT * FROM specialities`, 
            { type: QueryTypes.SELECT }
        );
    }

    async getOne(id){
        const result = await sequelize.query(
            `SELECT * FROM specialities WHERE id = ${id}`, 
            { type: QueryTypes.SELECT }
        )

        return result[0];
    }

    async create(item){
        try{
            const [insertedId, _] = await sequelize.query(
                `INSERT INTO specialities
                SET
                    name = '${item.name}'
                `,
                { type: QueryTypes.INSERT }
            )

            return await this.getOne(insertedId)
        } catch(e){

            return e;
        }
    }

    async delete(id){
        try{
            const [insertedId, _] = await sequelize.query(
                `DELETE FROM specialities WHERE id = ${id}`,
                { type: QueryTypes.DELETE }
            )

            return await this.getOne(insertedId)
        } catch(e){

            return e;
        }
    }

    async update(item, id){
        try{
            const [insertedId, _] = await sequelize.query(
                `UPDATE specialities
                SET
                    name = '${item.name}'
                    WHERE id = ${id}
                `,
                { type: QueryTypes.INSERT }
            )

            return await this.getOne(insertedId)
        } catch(e){

            return e;
        }
    }
}

module.exports = new SpecialitiesRepository()