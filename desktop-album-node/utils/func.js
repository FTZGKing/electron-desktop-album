//
// 获取格式化的现在时间
exports.nowDate = () => {
  const now = new Date() // 获取当前时间

  // 获取年份，例如 2023
  const year = now.getFullYear()
  // 获取月份，注意要加 1，因为月份从 0 开始计数，例如 3
  const month =
    now.getMonth() + 1 < 10 ? '0' + `${now.getMonth() + 1}` : now.getMonth() + 1
  // 获取日期，例如 9
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  // 获取小时，例如 12
  const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  // 获取分钟，例如 30
  const minutes =
    now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  // 获取秒数，例如 45
  const seconds =
    now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  // 获取毫秒数，例如 123
  const milliseconds = now.getMilliseconds()

  //   const timeString = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}-${milliseconds}`
  // 将获取到的时间信息组成一串数字，例如 20230309123045456
  const timeString = `${year}${month}${date}${hours}${minutes}${seconds}-${milliseconds}`
  return timeString
}

//
//
// 定义防抖函数
exports.debounce = (func, delay) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//
//
// 定义节流函数
exports.throttle = (func, delay) => {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

//
//
// 分页查询，提取分页数据
exports.pagingQuery = (page, size, list) => {
  let listLength = list.length
  let maxNum = ''
  let minNum = ''

  minNum = (page - 1) * size
  if (page * size > listLength) maxNum = listLength
  else maxNum = page * size

  let arr = []
  for (minNum; minNum < maxNum; minNum++) arr.push(list[minNum])

  return [...arr]
}
