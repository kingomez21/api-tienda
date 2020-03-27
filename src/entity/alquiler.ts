import {Entity, PrimaryColumn, ManyToOne, Column, JoinColumn, OneToMany} from 'typeorm';
import {Usuario} from './usuario';
import {Bicicleta} from './bicicleta';
import { Entrega } from './entrega'; 

@Entity()
export class Alquiler {

    @PrimaryColumn({
        type: "int",
        unique: true,
        width: 5
    })
    codigoAlquiler: number;

    @Column({
        type: "date"
    })
    fechaAlquiler: string;

    @Column({
        type: "time"
    })
    horaInicio: string;

    @ManyToOne(
        () => Usuario,
        usuario => usuario.alquileres
    )
    @JoinColumn([{referencedColumnName: "identificacion"}])
    idUsuario: Usuario;

    @ManyToOne(
        () => Bicicleta,
        bicicleta => bicicleta.alquilerBici
    )
    @JoinColumn([{referencedColumnName: "codigoBicicleta"}])
    codBici: Bicicleta;

    @OneToMany(
        () => Entrega,
        entrega => entrega.codAlquiler
    )
    entrgaAlquiler: Entrega[];
}