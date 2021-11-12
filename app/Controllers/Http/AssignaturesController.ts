import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Assignature from "App/Models/Assignature";

export default class AssignaturesController {
  public async index ({ response }: HttpContextContract) {
      const assignatures = await Assignature.all();
      return response.json(assignatures);
  }

  public async store ({ request, response }: HttpContextContract) {
    const { name, description } = request.all();
    const assignature = await Assignature.create({
      name,
      description
    });
    return response.json(assignature);
  }


  public async show ({ params, response }: HttpContextContract) {
    const assignature = await Assignature.find(params.id);
    return response.json(assignature);
  }

  public async update ({ response, request, params }: HttpContextContract) {
    const { name, description } = request.all();
    const assignature = await Assignature.find(params.id);
    if (assignature) {
      assignature.name = name;
      assignature.description = description;
      await assignature.save();
    }
    return response.json(assignature);
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const assignature = await Assignature.find(params.id)
    if (assignature) {
      await assignature.delete();
      return response.json({
        message: 'El elemento fue eliminado'
      })
    }
    else return response.badRequest({ message: 'El elemento no existe' })

  }
}
