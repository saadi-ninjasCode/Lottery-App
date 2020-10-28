import moment from 'moment-timezone'

function dateToString(date) { return new Date(date).toISOString() }
function dateToLocal(date) { return new Date(date).toLocaleString() }
function dateTolocalDate(date) { return new Date(date).toLocaleDateString() }
function dateToCustom(date) { return new Date(+date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
function dateWithWeekday(date) { return new Date(+date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }) }
function dateToCustomLondon(date) { return new Date(+date).toLocaleString('en', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) }
function dateWithWeekdayLondon(date) { return new Date(+date).toLocaleDateString('en', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London', timeZoneName: 'short' }) }

function dateToCustomMoment(date) {
    return moment(+date).format("DD MMM YYYY, hh:mm A")
}
function dateWithWeekdayMoment(date) {
    return moment(+date).format("LLLL")
}


export { dateToString, dateTolocalDate, dateToLocal, dateToCustom, dateToCustomLondon, dateToCustomMoment, dateWithWeekday, dateWithWeekdayLondon, dateWithWeekdayMoment }

// new Date(date).toLocaleString('en-US', { timezone: 'Asia/Karachi' })

// new Date().toLocaleString('en', { timeZone: 'Europe/London' })