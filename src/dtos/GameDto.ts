import { Decimal } from "@prisma/client/runtime/library"

export type GameDto = {
    name: string,
    description: string,
    price: Decimal | string | number,
    author: string
}