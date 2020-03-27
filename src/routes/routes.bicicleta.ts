import {Router} from 'express';
import {
    getBicicletas, saveBicicleta, updateBicicleta, deleteBicicleta, getOneBicicleta
} from '../controller/bicicleta.controller';
import passport from 'passport'
export const rutasBicicleta = Router();

rutasBicicleta.get('/obtener',passport.authenticate('jwt', {session: false}) ,getBicicletas)
              .get('/obtener/:id',passport.authenticate('jwt', {session: false}), getOneBicicleta)
              .post('/guardar',passport.authenticate('jwt', {session: false}) ,saveBicicleta)
              .put('/actualizar/:id',passport.authenticate('jwt', {session: false}) ,updateBicicleta)
              .delete('/eliminar/:id',passport.authenticate('jwt', {session: false}) ,deleteBicicleta);