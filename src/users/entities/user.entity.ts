


import { PasswordResetToken } from "src/password-reset-token/entities/password-reset-token.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    normal = 'normal',
    admin = 'admin'
}

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstName: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    lastName: string


    @Column({
        type: 'text'
    })
    address: string

    @Column({
        type: 'varchar',
        length: 120,
        unique: true,
        nullable: false,
    })
    email: string


    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
        nullable: false,
    })
    phone: string


    @Column({
        type: 'text',
        nullable: false,
    })
    password: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.normal,
    })
    role: UserRole;


    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[]



    @OneToMany(() => PasswordResetToken, token => token.user)
    passwordResetTokens: PasswordResetToken[]

}