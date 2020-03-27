import jwt from 'jsonwebtoken';
import {Admin} from '../entity/admin'

export class token {

    creacionToken(admin: Admin){

        return jwt.sign({
            id: admin.id
        }, "administrador", { 
            expiresIn: 86400
        })
        
    }

}