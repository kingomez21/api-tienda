import {Router} from 'express';
import {
    getsAlquiler, saveAlquiler, updateAlquiler, deleteAlquiler, getOneAlquiler
} from '../controller/alquiler.controller';
import passport from 'passport'
export const rutasAlquiler = Router();

rutasAlquiler.get('/obtener',passport.authenticate('jwt', {session: false}) ,getsAlquiler)
             .get('/obtener/:id',passport.authenticate('jwt', {session: false}), getOneAlquiler)
             .post('/guardar',passport.authenticate('jwt', {session: false}) ,saveAlquiler)
             .put('/actualizar/:id',passport.authenticate('jwt', {session: false}),updateAlquiler)
             .delete('/eliminar/:id',passport.authenticate('jwt', {session: false}) ,deleteAlquiler);