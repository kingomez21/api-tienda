import {Entity, PrimaryColumn, OneToMany, Column} from 'typeorm';
import {Alquiler} from './alquiler';

@Entity()
export class Bicicleta {

    @PrimaryColumn({
        type: "int",
        width: 5,
        unique: true
    })
    codigoBicicleta: number;

    @Column({
        type: "varchar",
        length: 4, 
        unique: true
    })
    placa: string;

    @Column({
        type: "varchar",
        length: 20
    })
    tipo: string;

    @Column({
        type: "double"
    })
    precioHora: number;

    @OneToMany(
        () => Alquiler,
        Alquiler => Alquiler.codBici
    )
    alquilerBici: Alquiler[];
}