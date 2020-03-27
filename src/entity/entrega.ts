import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {Alquiler} from './alquiler';

@Entity()
export class Entrega {

    @PrimaryGeneratedColumn({
        type: "int"
    })
    idEntrega: number;

    @ManyToOne(
        () => Alquiler,
        alquiler=> alquiler.entrgaAlquiler
    )
    @JoinColumn([{referencedColumnName: "codigoAlquiler"}])
    codAlquiler: Alquiler;

    @Column({
        type: "time"
    })  
    horaEntrega: string;

    @Column({
        type: "double",
        nullable: true
    })
    valorAlquiler: number;

    @Column({
        type: "float",
        nullable: true
    })
    descuento: number;

    @Column({
        type: "double",
        nullable: true
    })
    totalPagar: number;
}