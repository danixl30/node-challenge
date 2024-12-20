import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		version: 'v1.0.0',
		title: 'API service documentation',
		description: 'Docs for API service with Swagger',
	},
	servers: [
		{
			url: 'http://localhost:4000',
			description: '',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			createUserInput: {
				$email: 'test@mail.com',
				$role: 'user',
			},
			loginUserInput: {
				$email: 'test@mail.com',
				$password: 'password',
			},
			changeUserPasswordInput: {
				$email: 'test@mail.com',
			},
		},
	},
}

const outputFile = '../../swagger_output.json'
const endpointsFiles = ['../../router.ts']

swaggerAutogen({ openapi: '3.1.0' })(outputFile, endpointsFiles, doc)
