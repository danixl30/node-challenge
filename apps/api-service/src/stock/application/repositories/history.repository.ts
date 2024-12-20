import { History } from '../models/history'

export type SaveHistory = (history: History) => Promise<void>
