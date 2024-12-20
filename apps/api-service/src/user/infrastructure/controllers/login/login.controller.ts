import expressAsyncHandler from 'express-async-handler'
import { argon2CryptoService } from '../../../../core/infrastructure/argon2.crypto.service'
import { jwtService } from '../../../../core/infrastructure/jwt.service'
import { TokenPayload } from '../../../../user/application/models/token.payload'
import { loginUserService } from '../../../application/services/login/login.user.service'
import { userMongoRepository } from '../../repositories/user.repository'

export const loginUserController = expressAsyncHandler(async (req, res) => {
	/*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginUserInput"
                    }  
                }
            }
        } 
    */
	// #swagger.tags = ['Users']
	// #swagger.summary = 'Login user'
	// #swagger.description = 'Login user with email and password'
	const token = await loginUserService(
		userMongoRepository(),
		argon2CryptoService(),
		jwtService<TokenPayload>(),
	)(req.body)
	res.json({
		token,
	})
})
