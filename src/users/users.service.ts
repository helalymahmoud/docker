import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  findUsersByCampaign(id: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,) 
    {}


  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['joinedCampaigns'] });
  }
  

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['joinedCampaigns'] });
 
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashedPassword, role });
    return this.userRepository.save(user);
  }

  async update(id: string, UpdateUserDto): Promise<User> {
    await this.userRepository.update(id,UpdateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

}
