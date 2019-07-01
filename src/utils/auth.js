const localStorage = window.localStorage
const USER_KEY = 'user_info'
// export 也用来导出。他支持导出多个成员
// 他的方式有个好处：支持按需加载。需要谁就加载谁，打包（npm run build）的时候，对于不需要的成员就不会打包到结果中
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function saveUser (data) { // 保存用户登录的信息
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export function removeUser () {
  localStorage.removeItem(USER_KEY)
}
