import {Entity, PrimaryColumn, OneToMany, Column} from 'typeorm';
import {Alquiler} from './alquiler';

@Entity()
export class Usuario {

    @PrimaryColumn({
        type: "integer",
        unique: true
    })
    identificacion: number;

    @Column({
        type: "varchar",
        length: 40
    })
    nombre: string

    @Column({
        type: "integer"
    })
    telefono: number;

    @Column({
        type: "int"
    })
    bono: number;

    @OneToMany(
        () => Alquiler,
        Alquiler => Alquiler.idUsuario
    )
    alquileres: Alquiler[];
}