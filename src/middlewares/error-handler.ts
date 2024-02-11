import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@lib/utils';

export const handleError = (
	error: unknown,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('ERROR HANDLED IN MW: ', error);

	if (!error) {
		next();
	}

	if (error instanceof CustomError) {
		switch (error.type) {
			case 'NOT_FOUND': {
				res.status(404).json({ code: 404, message: 'Not found' });
				break;
			}

			case 'AUTHORIZATION_ERROR': {
				res.status(401).json({ code: 401, message: 'Unauthorized' });
				break;
			}

			default: {
				res.status(500).json({ code: 500, message: 'Internal server error' });
				break;
			}
		}
	}
};
