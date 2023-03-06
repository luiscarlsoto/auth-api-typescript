import { Response } from 'express'

type IStatusType = 'success' | 'error'

interface ApiResponse {
  [key: string]: any
  status: {
    type: IStatusType
    key: string
    message?: string
    code?: number
  }
}

export const respond = (res: Response, { status, ...data }: ApiResponse): void => {
  const { type, message, key } = status ?? { type: 'success', message: '', key: '' }
  res.status(status.type === 'success' ? 200 : status.code ?? 400).json({
    ...data,
    status: {
      type,
      message,
      key
    }
  })
}
