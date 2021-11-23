import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import EmailVerificationValidator from 'App/Validators/EmailVerificationValidator'
import TelegramLoginValidator from 'App/Validators/TelegramLoginValidator'
import WebLoginValidator from 'App/Validators/WebLoginValidator'

export default class AuthController {
    public async webLogin({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(WebLoginValidator)
        try {
            const token = await auth.use('api').attempt(payload.email, payload.password, {
                expiresIn: '12hours'
            })
            return response.ok({ message: 'login success', token })
        } catch (error) {
            return response.badRequest({ message: error.messages })
        }
    }

    public async telegramLogin({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(TelegramLoginValidator)
        const user = await User.findByOrFail('telegram_id', payload.telegram_id)
        const token = await auth.use('api').generate(user)
        return response.ok({ message: 'login success', token })
    }

    public async emailVerification({ request, response }: HttpContextContract) {
        const payload = await request.validate(EmailVerificationValidator)
        let user = await User.query()
            .where('email', payload.email)
            .andWhereHas('verificationCode', (codeQuery) => {
                codeQuery.where('code', payload.code)
            })
            .firstOrFail()
        user.verified = true
        await user.save()

        return response.ok({ message: 'verification success' })
    }
}
