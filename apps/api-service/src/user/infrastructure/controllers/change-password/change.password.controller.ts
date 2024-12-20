import expressAsyncHandler from 'express-async-handler'
import { argon2CryptoService } from '../../../../core/infrastructure/argon2.crypto.service'
import { getRandomPassword } from '../../../../core/infrastructure/random.password'
import { updateUserPassword } from '../../../application/services/update-password/update.password'
import { postUpadtePasswordEmailSender } from '../../emails/email.sender'
import { userMongoRepository } from '../../repositories/user.repository'

export const changeUserPasswordController = expressAsyncHandler(
	async (req, res) => {
		/*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/changeUserPasswordInput"
                    }  
                }
            }
        } 
    */
		// #swagger.tags = ['Users']
		// #swagger.summary = 'Change user password'
		// #swagger.description = 'Set user email to change password'
		await updateUserPassword(
			userMongoRepository(),
			getRandomPassword,
			argon2CryptoService(),
			[postUpadtePasswordEmailSender],
		)(req.body)
		res.status(200).json()
	},
)
