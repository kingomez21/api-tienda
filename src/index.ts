import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import {administrador} from './middlewares/passport';

import {rutasAdmin} from './routes/routes.admin';
import {rutasUsuario} from './routes/routes.usuario';
import {rutasBicicleta} from './routes/routes.bicicleta';
import { rutasAlquiler } from "./routes/routes.alquiler";
import {rutasEntrega} from './routes/routes.entrega';

createConnection().then().catch(error => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passport.use(administrador);

app.use('/api/admin', rutasAdmin);
app.use('/api/usuario', rutasUsuario);
app.use('/api/bicicleta', rutasBicicleta);
app.use('/api/alquiler', rutasAlquiler);
app.use('/api/entrega', rutasEntrega);

app.listen(3000, () => {
    console.log("Express server has started on port 3000");
});