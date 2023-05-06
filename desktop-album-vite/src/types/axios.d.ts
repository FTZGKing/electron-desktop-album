interface dataReust<T> {
  status: number
  message: string
  data?: T
  verify?: string
  token?: string
}
type PromiseRes<T = {}> = Promise<dataReust<T>>

interface getMyselfInfoItf {
  nickname: string
  avatar: string
}
