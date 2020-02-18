const S = require('sequelize')
const db = require("../db")
const Categorias = require("./categorias")
class Producto extends S.Model { }

Producto.init({

    nombre: {

        type: S.STRING
    },
    precio: {

        type: S.INTEGER


    },
    descripcion: {

        type: S.TEXT


    },
    disponible: {

        type: S.BOOLEAN,
        defaultValue: true,
        get() { this.getDataValue("disponible") },
        set(data) {
            if (data === false) {


                this.nombre = `${this.nombre} NO DISPONIBLE`


            }




        }

    },
    truncarDescripcion: {
        type: S.VIRTUAL,
        get() {

            return this.descripcion.slice(0, 20) + "..."


        }


    }



}, { sequelize: db, modelName: 'producto' })
/*
Producto.addHook("beforeCreate", (producto, option) => {


    if (producto.disponible === false) {

        producto.titulo = `${producto.nombre} NO DISPONIBLE`



    }

    
})
   */


Producto.belongsTo(Categorias, { as: 'Categoria' });

module.exports = Producto;