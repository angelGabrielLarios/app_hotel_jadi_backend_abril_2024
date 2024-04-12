import { Bedroom } from "src/bedrooms/entities/bedroom.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'reservations'
})
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column({
        type: 'datetime'
    })
    check_in_date: string

    @Column({
        type: 'datetime'
    })
    check_out_date: string


    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @ManyToOne(() => User, (user) => user.reservations)
    user: User


    @ManyToOne(() => Bedroom, (bedroom) => bedroom.reservations)
    bedroom: Bedroom




}