import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface IEmailBody {
  email: string
}

interface IAuthenticateBody {
  token: string
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/testing/get-users')
  testingGetUsers() {
    return this.authService.testingGetUsers()
  }

  @Post('/login-or-create')
  async loginOrCreate(@Body() body: IEmailBody) {
    const { email } = body
    return this.authService.loginOrCreate(email)
  }

  @Post('/login')
  async loginUser(@Body() body: IAuthenticateBody) {
    const { token } = body

    return this.authService.authenticate(token)

  }

  @Post('/signup')
  async signup(@Body() body: IAuthenticateBody) {
    const { token } = body 

    return this.authService.authenticate(token)
  }

}
