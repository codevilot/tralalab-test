export type Response = {
    error: {
        code: number
        message: string
        data: { message: string }
    }
    payload: {
        method: string
        params: {
            value: string
            from: string
            to: string
        }[]
        id: number
        jsonrpc: string
    }
}
const INSUFFICIENT_BALANCE = 'insufficient balance for transfer'

class ErrorUtil {
    public get(error: unknown) {
        const err = error as object
        if (!('info' in err))
            return { error: { data: { message: 'invalid FixedNumber' } } }
        return err.info as Response
    }
}

export const errorUtil = new ErrorUtil()
