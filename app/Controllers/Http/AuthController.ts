import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import EmailVerificationValidator from 'App/Validators/EmailVerificationValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
    public async login({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(LoginValidator)
        try {
            const token = await auth.use('api').attempt(payload.email, payload.password, {
                expiresIn: '12hours'
            })
            return response.ok({ message: 'login success', token })
        } catch (error) {
            return response.badRequest({ message: error.messages })
        }
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
