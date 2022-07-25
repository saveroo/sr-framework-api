import { VercelResponse } from '@vercel/node'

export function CreateResponse<T>(
  instance: VercelResponse,
  statusCode: number,
  body: T,
  // eslint-disable-next-line @typescript-eslint/ban-types
  props?: { }): void {
    instance.status(statusCode)
    instance.json({
      statusCode,
      ...props,
      body,
    })
}
