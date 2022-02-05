import * as express from "express";
import { json, static as eStatic } from "express";
import { engine } from 'express-handlebars';

import { handlebarsHelpers } from "./utils/handlebarsHelpers";

// Routers import

import { homeRouter } from "./routers/homeRouter";
import { warriorRouter } from "./routers/warriorRouter";

// App settings

const app = express();

app.use(json());
app.use(eStatic('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

// Routers

app.use('/', homeRouter);
app.use('/warriors', warriorRouter);

// Listener

app.listen(3000, 'localhost', () => console.log('Server is listening on http://localhost:3000'));