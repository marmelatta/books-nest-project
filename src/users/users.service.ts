/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "../entities/user.entity";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection()
    private connection: Connection
  ) {
  }

  create(data: CreateUserDto): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const password = data.password
    const user = new this.UserModel({ ...data, password: bcrypt.hashSync(password, salt) });
    return user.save();
  }

  findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec();
  }

  findOne(email: string): Promise<User> {
    return this.UserModel.findOne({ email: email }).exec();
  }

  getUser(id: number): Promise<UserDocument> {
    return this.UserModel.findById({ _id: id }).exec();
  }

  updateUser(id: string, data: User): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }).exec();
  }

  deleteUser(id: string): Promise<UserDocument> {
    return this.UserModel.findOneAndUpdate({ _id: id }).exec();
  }
}
