import { Args, Context, Resolver, Mutation, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ActivationResponse, ForgotPasswordResponse, LoginResponse, LogoutResponse, RegisterResponse, ResetPasswordResponse } from "./types/user.types";
import { ActivationDto, ForgotPasswordDto, RegisterDto, ResetPasswordDto } from "./dto/user.dto";
import { BadRequestException, UseGuards } from '@nestjs/common'
import { User } from "./entities/user.entity";
import { Response } from "express";
import { AuthGuard } from "./guards/auth.guard";

@Resolver('User')
export class userResolver {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: { res: Response }
    ): Promise<RegisterResponse> {

        if (!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException("Please fill all the fields")
        }
        const { activation_token } = await this.userService.register(registerDto, context.res);
        return {
            activation_token
        }
    }


    // @Query(() => [User])
    // async getUsers(

    // ) {
    //     return this.userService.getUsers()
    // }

    @Mutation(() => ActivationResponse)
    async activateUser(
        @Args('activationDto') activationDto: ActivationDto,
        @Context() context: { res: Response },
    ): Promise<ActivationResponse> {
        return await this.userService.activateUser(activationDto, context.res);
    }

    @Mutation(() => LoginResponse)
    async Login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginResponse> {
        return await this.userService.Login({ email, password });
    }

    @Query(() => LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInUser(@Context() context: { req: Request }) {
        return await this.userService.getLoggedInUser(context.req);
    }

    @Query(() => LogoutResponse)
    @UseGuards(AuthGuard)
    async logOutUser(@Context() context: { req: Request }) {
        return await this.userService.Logout(context.req);
    }

    @Mutation(() => ForgotPasswordResponse)
    async forgotPassword(
        @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
    ): Promise<ForgotPasswordResponse> {
        return await this.userService.forgotPassword(forgotPasswordDto);
    }
    @Mutation(() => ResetPasswordResponse)
    async resetPassword(
        @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
    ): Promise<ResetPasswordResponse> {
        return await this.userService.resetPassword(resetPasswordDto);
    }
}
