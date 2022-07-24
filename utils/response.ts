import { NowResponse } from '@vercel/node'

export function CreateResponse<T>(
  instance: NowResponse,
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
