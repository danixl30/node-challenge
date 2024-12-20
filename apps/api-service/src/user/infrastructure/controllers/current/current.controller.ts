import { Request, Response } from 'express'

export const currentUserController = (req: Request, res: Response) => {
	/* #swagger.security = [{
            "bearerAuth": []
    }] */
	// #swagger.tags = ['Users']
	// #swagger.summary = 'Get the current user'
	// #swagger.description = 'Get the current token user'
	res.json(req.user)
}
