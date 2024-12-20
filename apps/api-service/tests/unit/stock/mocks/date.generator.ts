import { GetCurrentDate } from '../../../../src/core/application/date.generator'

export const dateGeneratorMock =
	(date: Date): GetCurrentDate =>
	async () =>
		date
