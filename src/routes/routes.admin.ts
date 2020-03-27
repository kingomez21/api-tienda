import {Router} from 'express';
import {
    getAdmins, saveAdmin, login, inlogin, updateAdmin
} from '../controller/admin.controller';
import passport from 'passport';
export const rutasAdmin = Router();

rutasAdmin.get('/obtener',passport.authenticate('jwt', {session: false}) ,getAdmins)
          .post('/guardar',passport.authenticate('jwt', {session: false}) ,saveAdmin)
          .put('/actualizar/:id',passport.authenticate('jwt', {session: false}), updateAdmin)
          .post('/login', login)
          .get('/me', inlogin);