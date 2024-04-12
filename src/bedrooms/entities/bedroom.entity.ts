
import { BedroomType } from "src/bedroom-type/entities/bedroom-type.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum StatusBedroomEnum {
    available = "available",
    busy = "busy",
}

@Entity({
    name: 'bedrooms'
})
export class Bedroom {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({
        type: 'enum',
        enum: StatusBedroomEnum,
        default: StatusBedroomEnum.available
    })
    status: StatusBedroomEnum

    @Column({
        type: 'int',
    })
    num_bedroom: number


    @ManyToOne(() => BedroomType, bedroomType => bedroomType.bedrooms)
    bedroomType: BedroomType

    @OneToMany(() => Reservation, reservation => reservation.bedroom)
    reservations: Reservation[]
}