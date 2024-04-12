import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'password-reset-token'
})
export class PasswordResetToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar'
    })
    token: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date


    @ManyToOne(() => User, user => user.passwordResetTokens)
    @JoinColumn({ name: 'user_id' })
    user: User


}
