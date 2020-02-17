const S = require('sequelize')
const db = require("../db/index")

class Categoria extends S.Model { }

Categoria.init({


    nombre: {

        type: S.STRING



    }





}, { sequelize: db, modelName: 'categoria' })


module.exports = Categoria;