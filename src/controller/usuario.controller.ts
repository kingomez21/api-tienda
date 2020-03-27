import {Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Usuario} from '../entity/usuario';

export const getUsuarios = async (req: Request, res: Response) => {

    try {
        
        const users: Usuario[] = await getManager().getRepository(Usuario).find();

        if(users){
            return res.send(users);
        }

        return res.status(404).json({
            messages: "no se pudo mostrar ningun usuario"
        })

    } catch (error) {
        return res.status(404).json({
            messages: error,
            problem: "ocurrio un problema"
        })
    }
}

export const saveUsuario = async (req: Request, res: Response): Promise<Response> => {

    try {

        await getManager().getRepository(Usuario).createQueryBuilder()
            .insert()
            .into(Usuario)
            .values({
                identificacion: req.body.identificacion,
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                bono: req.body.bono
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            usuario: "guardado con exito"
        });
        
    } catch (error) {
        return res.status(404).json({
            messages: error,
            problem: "ocurrio un problema"
        })
    }
}

export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Usuario).createQueryBuilder()
            .update(Usuario)
            .set({
                identificacion: req.body.identificacion,
                nombre: req.body.nombre,
                telefono: req.body.telefono,
                bono: req.body.bono
            })
            .where("identificacion = :identificacion", {
                identificacion: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            });
        
        return res.json({
            usuario: "actualizado con exito"
        })

    } catch (error) {
        return res.status(404).json({
            messages: error,
            problem: "ocurrio un problema"
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Usuario).createQueryBuilder()
            .delete()
            .from(Usuario)
            .where("identificacion = :identificacion", {
                identificacion: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            usuario: "eliminado con exito"
        })

    } catch (error) {
        return res.status(404).json({
            messages: error,
            problem: "ocurrio un problema"
        })
    }
}

export const getOneUsuario = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const getOne = await getManager().getRepository(Usuario).findOne(req.params.id);

        if(getOne){
            return res.send(getOne);
        }

        return res.json({
            message: "error"
        })

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
}