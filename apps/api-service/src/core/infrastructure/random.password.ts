import random from 'random-string-generator'
import { GetRandomPassword } from '../application/random.password'

export const getRandomPassword: GetRandomPassword = async () => random(12)
