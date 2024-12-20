import nodemailer from 'nodemailer'
import { PostUpdateUserPassword } from '../../application/services/update-password/ports/post.update.password'

const transporter = nodemailer.createTransport({
	service: process.env.MAIL_SERVICE,
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT),
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_EMAIL_PASSWORD,
	},
})

export const postUpadtePasswordEmailSender: PostUpdateUserPassword = async (
	user,
	password,
) => {
	await transporter.sendMail({
		from: process.env.USER_EMAIL,
		to: user.email,
		subject: 'Password changed',
		text: `Hi! Your new password is: ${password}`,
	})
}
