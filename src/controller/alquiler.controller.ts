import {Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Alquiler} from '../entity/alquiler'

export const getsAlquiler = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const gets = await getManager().getRepository(Alquiler).find();

        if(gets){
            return res.send(gets);
        }

        return res.json({
            message: "error"
        })

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const saveAlquiler = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Alquiler).createQueryBuilder()
            .insert()
            .into(Alquiler)
            .values({
                codigoAlquiler: req.body.codigo,
                fechaAlquiler: req.body.fecha,
                horaInicio: req.body.horaInicio,
                idUsuario: req.body.idUsuario,
                codBici: req.body.codBici
            })
            .execute()
            .catch(err => {
                console.log(err);
            });
        
        return res.json({
            message: "guardado con exito"
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const updateAlquiler = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Alquiler).createQueryBuilder()
            .update(Alquiler)
            .set({
                codigoAlquiler: req.body.codigo,
                fechaAlquiler: req.body.fecha,
                horaInicio: req.body.horaInicio,
                idUsuario: req.body.idUsuario,
                codBici: req.body.codBici
            })
            .where("codigoAlquiler = :codigo", {
                codigo: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            });
        
        return res.json({
            message: "actualizado con exito"
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const deleteAlquiler = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Alquiler).createQueryBuilder()
            .delete()
            .from(Alquiler)
            .where("codigoAlquiler = :codigo", {
                codigo: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            });
        
        return res.json({
            message: "eliminado con exito"
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const getOneAlquiler = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const getOne = await getManager().getRepository(Alquiler).findOne(req.params.id);

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