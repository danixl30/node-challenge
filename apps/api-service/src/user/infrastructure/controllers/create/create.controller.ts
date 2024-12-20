import expressAsyncHandler from 'express-async-handler'
import { argon2CryptoService } from '../../../../core/infrastructure/argon2.crypto.service'
import { mongoIdGenerator } from '../../../../core/infrastructure/id.mongo.generator'
import { getRandomPassword } from '../../../../core/infrastructure/random.password'
import { createUserService } from '../../../../user/application/services/create/create.user.service'
import { CreateUserDTO } from '../../../application/services/create/types/dto'
import { userMongoRepository } from '../../repositories/user.repository'

export const createUserController = expressAsyncHandler(async (req, res) => {
	/*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createUserInput"
                    }  
                }
            }
        } 
    */
	// #swagger.tags = ['Users']
	// #swagger.summary = 'Register an user'
	// #swagger.description = 'Create an user by email and type'
	const data = await createUserService(
		mongoIdGenerator,
		argon2CryptoService(),
		userMongoRepository(),
		getRandomPassword,
	)(req.body as CreateUserDTO)
	res.status(201).json(data)
})
