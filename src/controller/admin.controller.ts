import {Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Admin} from '../entity/admin';
import {bcypt} from '../middlewares/bcrypt';
import {token} from '../middlewares/jsonwtok'
import jwt from 'jsonwebtoken';

export const getAdmins = async(req: Request, res: Response)=> {

    try {
        
        let getadmins = getManager().getRepository(Admin);

        const admins = await getadmins.find();

        res.send(admins);

    } catch (error) {
        
        res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }

}

export const saveAdmin = async (req: Request, res: Response): Promise<Response> => {

    try {

        let crypt = new bcypt();

        await getManager().getRepository(Admin).createQueryBuilder()
            .insert()
            .into(Admin)
            .values({
                //id: req.body.id,
                identificacion: req.body.identificacion,
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                contrasena: await crypt.encriptar(req.body.contrasena),
                telefono: req.body.telefono
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.status(200).json({
            message: "exito al guardar"
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
}

export const updateAdmin = async(req: Request, res: Response): Promise<Response> => {

    try {
        
        let crypt = new bcypt();

        await getManager().getRepository(Admin).createQueryBuilder()
            .update(Admin)
            .set({
                //id: req.body.id,
                identificacion: req.body.identificacion,
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                contrasena: await crypt.encriptar(req.body.contrasena),
                telefono: req.body.telefono
            })
            .where("id = :id", {
                id: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            message: "administrador actualizado"
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
} 

export const login = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        let crypt = new bcypt();
        let tok = new token();

        let admin: any = await getManager().getRepository(Admin).createQueryBuilder("admin")
            .where("admin.codigo = :codigo",{codigo: req.body.codigo})
            .getOne()
        let contrasena = req.body.contrasena;

        const band: boolean = await crypt.login(contrasena, admin.contrasena);

        if(admin != null && band === true){
            return res.json(tok.creacionToken(admin));
        }

        return res.json({
            usuario: "no encontrado"
        })

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
}

export const inlogin = async (req: Request, res: Response): Promise<Response> => {

    try {
        

        const token: any = req.headers['x-access-login'];

        if(!token){
            return res.status(401).json({
                autenticacion: false,
                mensaje: "no estas autorizado"
            });
        }
    
        
        const decoded: any = jwt.verify(token, "administrador");
        
        const data = await getManager().getRepository(Admin).findOne(decoded.id);
    
        if(!data){
            return res.status(401).json({
                error: "no hay ningun usuario"
            });
        }
        
        return res.json(data);

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
}