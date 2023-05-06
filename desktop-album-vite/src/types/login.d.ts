interface registerAccountItf {
  account: string
  password: string
  secretKey: string
}

interface verifyAccountItf {
  account: string
  secretKey: string
}

interface loginAccountItf {
  account: string
  password: string
  verifyCode: string
}
