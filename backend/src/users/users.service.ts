import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
   ) {}

   async create(createUserDto: CreateUserDto): Promise<User> {
      const existingUser = await this.userModel.findOne({
         email: createUserDto.email,
      });
      if (existingUser) throw new ConflictException('Email já cadastrado');

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const createdUser = new this.userModel({
         ...createUserDto,
         password: hashedPassword,
      });

      return createdUser.save();
   }

   async findOne(email: string): Promise<UserDocument | undefined | null> {
      return this.userModel.findOne({ email }).exec();
   }

   async findAll() {
      return this.userModel.find().exec();
   }
   async remove(id: string) {
      return this.userModel.findByIdAndDelete(id).exec();
   }

   async update(
      id: string,
      updateUserDto: UpdateUserDto,
   ): Promise<UserDocument | null> {
      return this.userModel
         .findByIdAndUpdate(id, updateUserDto, { new: true })
         .exec();
   }
}
