const categorias = require("./models/categorias")


categorias.bulkCreate([
    { nombre: "libros" },
    { nombre: "comida" }

])
    .then(data => console.log(data))