import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import LoginUserValidator from "App/Validators/LoginUserValidator";
import RegisterUserValidator from "App/Validators/RegisterUserValidator";

export default class UsersController {
    async register({ request, auth, response }: HttpContextContract) {
        await request.validate(RegisterUserValidator);
        const { email, password } = await request.all();
        const user = await User.create({
            email,
            password
        });
        return response.json(await auth.use('api').generate(user));
    }
    async login({ request, auth, response }: HttpContextContract) {
      await request.validate(LoginUserValidator);
      const { email, password } = await request.all();
      return response.json(await auth.use('api').attempt(email, password));
    }
}
