import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async findOneById(id: string): Promise<User> {

    const user = await this.userRepository.findOne({
      select: {
        firstName: true,
        lastName: true,
        address: true,
        id: true,
        email: true,
        phone: true,
        password: true,
        role: true
      },
      where: {
        id: id
      }
    })
    return user

  }

  async findOneByEmail(email: string): Promise<User> {

    const user = await this.userRepository.findOne({
      select: {
        firstName: true,
        lastName: true,
        address: true,
        id: true,
        email: true,
        phone: true,
        password: true,
        role: true
      },
      where: {
        email: email
      }
    })

    return user

  }

  async findOneByPhoneNumber({ phoneNumber }: { phoneNumber: string }) {

    const user = await this.userRepository.findOne({
      select: {
        firstName: true,
        lastName: true,
        address: true,
        id: true,
        email: true,
        phone: true,
        password: true,
      },
      where: {
        phone: phoneNumber
      }
    })
    return user

  }

  async save(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto)
    return user
  }


  async restorePassword({ email, newPassword }: { email: string, newPassword: string }) {

    const updateUser = await this.userRepository.update({ email: email }, {
      password: newPassword,

    })

    return updateUser
  }

}