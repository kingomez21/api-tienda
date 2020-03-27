import {Request, Response} from 'express';
import {getManager, getConnection} from 'typeorm';
import {Entrega} from '../entity/entrega';
import {Alquiler} from '../entity/alquiler';
import { Bicicleta } from '../entity/bicicleta';

export const getEntregas = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const gets: Entrega[] = await getManager().getRepository(Entrega).find();

        if(gets){
            return res.send(gets);
        }

        return res.json({
            message: "ocurrio un error"
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un error"
        })
    }
}

export const saveEntrega = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const alquiler: any = await getManager().getRepository(Alquiler).findOne(req.body.codAlquiler);
        const Bici: any = await getManager().getRepository(Bicicleta).findOne(alquiler.codBici);
        const precioBici: number = Bici.precioHora;
        const h: any = await getConnection().query(`
        SELECT CAST((? - horaInicio) * 1 As INTEGER) As INTEGER FROM alquiler;`, 
        req.body.horaEntrega);
        const horas: number = h[0].INTEGER;
        let valor: number = horas * precioBici;
        let totPagar: number = valor;
        
        await getManager().getRepository(Entrega).createQueryBuilder()
            .insert()
            .into(Entrega)
            .values({
                idEntrega: req.body.idEntrega,
                codAlquiler: req.body.codAlquiler,
                horaEntrega: req.body.horaEntrega,
                valorAlquiler: valor,
                totalPagar: totPagar
            })
            .execute()
            .catch(err => {
                console.log(err);
            })

        return res.json({
            message: "exito al guardar"
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}

export const updateEntrega = async (req: Request, res: Response): Promise<Response> => {

    try {

        await getManager().getRepository(Entrega).createQueryBuilder()
            .update()
            .set({
                idEntrega: req.body.idEntrega,
                codAlquiler: req.body.codAlquiler,
                horaEntrega: req.body.horaEntrega,
                valorAlquiler: req.body.valorAlquiler,
                totalPagar: req.body.totalPagar
            })
            .where("idEntrega = :id", {
                id: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            })
        
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

export const deleteEntrega = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        await getManager().getRepository(Entrega).createQueryBuilder()
            .delete()
            .from(Entrega)
            .where("idEntrega = :id", {
                id: req.params.id
            })
            .execute()
            .catch(err => {
                console.log(err);
            });
        
        return res.json({
            message: "exito al eliminar"
        })

    } catch (error) {
        return res.status(404).json({
            message: error,
            problem: "hubo un problema"
        })
    }
}