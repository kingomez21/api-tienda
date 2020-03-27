import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { getRepository } from 'typeorm';
import {Admin} from '../entity/admin';


const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: "administrador"
}

export const administrador = new Strategy(opts, async (payload, done) => {

    try {

        const users = await getRepository(Admin).findByIds(payload.id);

        if (users) {
            return done(null, users);
        }

        return done(null, false);

    } catch (error) {
        console.log(error);
    }
})