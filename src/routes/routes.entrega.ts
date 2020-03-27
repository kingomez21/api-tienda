import {Router} from 'express';
import {
    getEntregas, saveEntrega, updateEntrega, deleteEntrega
} from '../controller/entrega.controller';
import passport from 'passport';

export const rutasEntrega = Router();

rutasEntrega.get('/obtener',passport.authenticate('jwt', {session: false}) ,getEntregas)
            .post('/guardar',passport.authenticate('jwt', {session: false}) ,saveEntrega)
            .put('/actualizar/:id',passport.authenticate('jwt', {session: false}) ,updateEntrega)
            .delete('/eliminar/:id',passport.authenticate('jwt', {session: false}) ,deleteEntrega);