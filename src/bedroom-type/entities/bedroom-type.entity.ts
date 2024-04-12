import { Bedroom } from "src/bedrooms/entities/bedroom.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: 'bedroom_type'
})
export class BedroomType {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })

    type: string

    @Column({
        type: 'float',

    })
    price_for_one_night: number


    @Column({
        type: 'int',

    })
    num_single_beds: number

    @Column({
        type: 'int',

    })
    num_king_size_beds: number

    @Column({
        type: 'int',

    })
    num_restroom: number


    @Column({
        type: 'int'
    })
    num_tv: number


    @Column({
        type: 'text'
    })
    url_image: string




    @OneToMany(() => Bedroom, bedroom => bedroom.bedroomType)
    bedrooms: Bedroom[]

}
