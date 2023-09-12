const sequelize =  require('../../db/index')
const { QueryTypes } = require('sequelize');

const specialitiesRepository = require('../repositories/SpecialitiesRepository')

class SpecialitiesService{
    async getList() {
        return specialitiesRepository.getList();
    }

    async getOne(id){
        return await specialitiesRepository.getOne(id)
    }

    async create(item){
        return await specialitiesRepository.create(item)
    }

    async delete(id){
        return await specialitiesRepository.delete(id)
    }

    async update(item, id){
        return await specialitiesRepository.update(item. id)
    }
}

module.exports = new SpecialitiesService()