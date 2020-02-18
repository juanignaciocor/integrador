const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Productos = require("../models/productos.js")
const Categoria = require("../models/categorias")
const db = require("../db")



/* router.get("/categoria/:libros", (req, res, next) => {

    console.log("req.query")


}) */

router.get("/edit/:id", (req, res, next) => {
    Productos.findByPk(req.params.id)
        .then((data) => {

            res.render("form", { data: data })




        })
        .catch(next)

})

router.put("/edit/:id"), (req, res, next) => {
    const precio = parseInt(req.body.precio)
    if (req.body.disponible === "true") {
        const disponible = true
    } else { const disponible = false }

    Productos.findByPk(req.params.id)
        .then((producto) => {

            producto.update({

                nombre: req.body.nombre,
                precio: precio,
                descripcion: req.body.descripcion,
                disponible: disponible





            })
                .then((data) => {


                    res.sendStatus(200)
                })


        })
        .catch(next)



}




router.get("/eliminar/:id", (req, res, next) => {
    const id = req.params.id
    Productos.destroy({

        where: {
            id: id


        }

    })
        .then((objetoEliminado) => {

            res.sendStatus(200)

        })
        .catch(next)

})

router.get("/add", (req, res, next) => {

    res.render("index")

})
router.post("/add", (req, res, next) => {
    console.log(req.body)
    let disponible = null

    const precio = parseInt(req.body.precio)
    if (req.body.disponible === "false") {
        disponible = false
    } else { disponible = true }
    console.log(disponible, "ACA ESTA DISPONIBLE")

    Productos.create({

        nombre: req.body.nombre,
        precio: precio,
        descripcion: req.body.descripcion,
        disponible: disponible




    })
        .then(producto => {
            res.json({
                mensaje: "SE CREO EL OBJETO",
                producto: producto
            })
        })
        .catch(next)

})

router.get("/:id", (req, res, next) => {

    const id = req.params.id
    Productos.findByPk(id)
        .then((data) => {
            if (data === null) res.sendStatus(404)
            res.status(200).json({ producto: data })


        })

})



router.get("/", (req, res, next) => {

    if (req.query.categoria) {


        Categoria.findOne({
            where: {
                nombre: req.query.categoria
            }
        })
            .then((data) => {

                Productos.findAll({
                    where: {

                        CategoriaId: data.dataValues.id
                    }
                })
                    .then((data) => {
                        console.log(data)
                        res.json(data)
                    })

            })


    }

    else {
        Productos.findAll()
            .then((data) => {

                res.json(data)
            })
            .catch(err => {

                res.sendStatus(500)

            })

    }

})
module.exports = router;
