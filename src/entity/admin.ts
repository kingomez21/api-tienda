import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Admin {

    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        type: "int",
        width: 11,
        unique: true
    })
    identificacion: number;

    @Column({
        type: "varchar",
        length: 40
    })
    nombre: string;

    @Column({
        type: "int",
        width: 5,
        unique: true
    })
    codigo: number

    @Column({
        type: "varchar",
        length: 10
    })
    contrasena: string;

    @Column({
        type: "integer",
        width: 10
    })
    telefono: number
}