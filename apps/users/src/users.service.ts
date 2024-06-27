import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Response } from 'express';
import * as argon2 from "argon2";

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}
@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) { }

  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    // const phoneNumberExist = await this.prisma.user.findUnique({
    //   where: {
    //     phone_number,
    //   }
    // })
    // if (phoneNumberExist) throw new BadRequestException("user alread exist with this phone number")
    const phoneNumbersToCheck = [phone_number];

    const usersWithPhoneNumber = await this.prisma.user.findMany({
      where: {
        phone_number: {
          not: null,
          in: phoneNumbersToCheck,
        },
      },
    });
    if (usersWithPhoneNumber.length > 0) {
      throw new BadRequestException(
        'User already exist with this phone number!',
      );
    }
    if (isEmailExist) {
      throw new BadRequestException("Phone Number already exist");
    }
    const hashedPassword = await argon2.hash(password)
    const user = {
      name,
      email,
      password: hashedPassword,
      phone_number,
    };
    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;
    // const user = await this.prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     phone_number,
    //     password: hashedPassword
    //   }
    // });
    return { user, response }
    // const user = {
    //   name,
    //   email,
    //   password
    // }

    // return user

  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );
    return { token, activationCode };
  }


  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = {
      email,
      password
    }
    return user
  }

  async getUsers() {
    // const users = {
    //   id: "someId",
    //   name: "some Name",
    //   email: 'abc@gmail.com',
    //   password: "somepasss",
    // }

    // return users;
    return this.prisma.user.findMany({})
  }
}
