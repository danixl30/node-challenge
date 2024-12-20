import { Optional } from '../../../utils/types/optional'
import { Stock } from '../models/stock'

export type GetStockBySymbol = (symbol: string) => Promise<Optional<Stock>>
