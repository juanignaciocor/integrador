const db = require("./db")
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const methodOverride = require("method-override")



////////
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render);
nunjucks.configure('views');
app.use(methodOverride("_method"))
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

db.sync({ logging: false, force: true })
    .then(function () {
        // asegurate de reemplazar el nombre de abajo con tu app de express
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error)
