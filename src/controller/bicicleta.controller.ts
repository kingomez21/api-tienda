import {Request, Response} from 'express';
import {getManager} from 'typeorm';
import {Bicicleta} from '../entity/bicicleta';

export const getBicicletas = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const getsBici: Bicicleta[] = await getManager().getRepository(Bicicleta).find();

        return res.send(getsBici);

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }

}

export const saveBicicleta = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Bicicleta).createQueryBuilder()
            .insert()
            .into(Bicicleta)
            .values({
                codigoBicicleta: req.body.codigo,
                placa: req.body.placa,
                tipo: req.body.tipo,
                precioHora: req.body.precioHora
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            message: "bicicleta guardada con exito"
        });

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const updateBicicleta = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Bicicleta).createQueryBuilder()
            .update(Bicicleta)
            .set({
                codigoBicicleta: req.body.codigo,
                placa: req.body.placa,
                tipo: req.body.tipo,
                precioHora: req.body.precioHora
            })
            .where("codigoBicicleta = :codigo", {
                codigo: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            message: "exito al actualizar"
        });

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo problema"
        })
    }
}

export const deleteBicicleta = async (req: Request, res: Response): Promise<Response> => {

    try {

        await getManager().getRepository(Bicicleta).createQueryBuilder()
            .delete()
            .from(Bicicleta)
            .where("codigoBicicleta = :codigo", {
                codigo: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
        return res.json({
            message: "exito al eliminar"
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo problema"
        })
    }
}

export const getOneBicicleta = async (req: Request, res:Response): Promise<Response> => {
     
    try {
        
        const getOne = await getManager().getRepository(Bicicleta).findOne(req.params.id);

        if(getOne){
            return res.send(getOne);
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