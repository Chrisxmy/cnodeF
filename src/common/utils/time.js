import moment from 'moment'

export function formatDate(time) {
  time = Number(time)
  time = new Date(time)
  time = moment(time).format('YYYY-MM-DD HH:mm')
  time = new Date(time)
  var delta = parseInt((new Date() - time) / 1000, 10)
  if (delta <= 0) return '现在'

  var minutes = delta / 60
  if (minutes < 1) return '刚刚'
  if (minutes < 2) return '一分钟之前'

  var hours = minutes / 60
  if (hours < 1) return parseInt(minutes, 10) + ' 分钟之前'
  if (hours < 1.5) return '大概一小时以前'

  var days = hours / 24
  if (days < 1) return Math.round(hours) + '小时以前'
  if (days < 7) return parseInt(days, 10) + ' 天以前'

  var month = time.getMonth() + 1
  if (month < 10) month = '0' + month
  var date = time.getDate()
  if (date < 10) date = '0' + date
  return [time.getFullYear(), month, date].join('-')
}
