import cors from 'cors'
import express from 'express'
import './core/infrastructure/database/mongoose.connection'
import swaggerUi from 'swagger-ui-express'
import { exceptionHandler } from './core/infrastructure/middlewares/exception.handler'
import { appRouter } from './router'
import swaggerOutput from './swagger_output.json'
import { User } from './user/application/models/user'

declare global {
	// biome-ignore lint/style/noNamespace: <explanation>
	namespace Express {
		interface Request {
			user: User
		}
	}
}

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', appRouter)
if (process.env.NODE_ENV === 'dev')
	app.use(
		'/api/docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerOutput, { explorer: true }),
	)
app.use(exceptionHandler)

export default app
