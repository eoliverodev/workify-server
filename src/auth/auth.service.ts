import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import * as stytch from "stytch";

const client = new stytch.Client({
    project_id: "project-test-25d1bed8-ba97-42e6-aeb3-cbed4ebbed4e",
    secret: "secret-test-OrmlbvfJp1JXABr3GQQ4MSyNqN9b-lG3_YA=",
    env: stytch.envs.test,
})

interface IUserDTO {
    email: string;
    emailId: string;
    userId: string;
}
  
@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async createNewUser(userDTO: IUserDTO) {
        const alreadyExistingUser = await this.userModel.findOne({ email: userDTO.email })

        if (!alreadyExistingUser) {
            const user = new this.userModel(userDTO);
            user.save()
            return user
        }
        return alreadyExistingUser
    }


    async loginOrCreate(email: string) {
        const loginOrSignupResponse = await client.magicLinks.email.loginOrCreate({
            email,
            login_magic_link_url: "http://localhost:4000/auth/login",
            signup_magic_link_url: "http://localhost:4000/auth/signup"
        })

        const {
            user_id: userId,
            email_id: emailId,
            user_created: userCreated,
            status_code
        } = loginOrSignupResponse

        if (status_code !== 200) {
            throw InternalServerErrorException
        }

        return this.createNewUser({ userId, emailId, email })
    }

    async authenticate(token: string) {
        const authenticateResponse = await client.magicLinks.authenticate(token, {
            session_duration_minutes: 43200,
        })
        return authenticateResponse
    }

    async testingGetUsers() {
        return this.userModel.find().exec()
    }

}
