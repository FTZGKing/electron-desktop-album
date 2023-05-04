interface dataReust<T> {
  data: T
  code: number
}
type PromiseRes<T = {}> = Promise<dataReust<T>>

interface registerItf {
  account: string
  password: string
  secret_key: string
}

interface verifyItf {
  account: string
  secret_key: string
}

interface loginItf {
  account: string
  password: string
  verify: string
}
