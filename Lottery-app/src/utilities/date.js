const moment = require('moment-timezone')

exports.dateToString = date => new Date(date).toISOString();
exports.dateToLocal = date => new Date(date).toLocaleString();
exports.dateTolocalDate = date => new Date(date).toLocaleDateString();
exports.dateToCustom = date => moment(+date).format("D MMMM YYYY, H:m")
exports.dateWithWeekdayTime = date => new Date(+date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
exports.dateWithWeekday = date => moment(+date).format("dddd, MMMM Do YYYY")
exports.dateToZone = date => moment(+date).tz('Europe/London').format("hh:mm A")
exports.dateToTime = date => moment(+date).format("hh:mm A")

// new Date(date).toLocaleString('en-US', { timezone: 'Asia/Karachi' })