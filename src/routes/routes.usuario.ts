import {Router} from 'express';
import { 
    getUsuarios, saveUsuario, updateUsuario, deleteUsuario, getOneUsuario
} from '../controller/usuario.controller';
import passport from 'passport'
export const rutasUsuario = Router();

rutasUsuario.get('/obtener', passport.authenticate('jwt', {session: false}) ,getUsuarios)
            .get('/obtener/:id',passport.authenticate('jwt', {session: false}), getOneUsuario)
            .post('/guardar',passport.authenticate('jwt', {session: false}) ,saveUsuario)
            .put('/actualizar/:id',passport.authenticate('jwt', {session: false}) ,updateUsuario)
            .delete('/eliminar/:id',passport.authenticate('jwt', {session: false}) ,deleteUsuario);
            