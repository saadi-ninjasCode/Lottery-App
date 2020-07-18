exports.dateToString = date => new Date(date).toISOString();
exports.dateToLocal = date => new Date(date).toLocaleString();
exports.dateTolocalDate = date => new Date(date).toLocaleDateString();
exports.dateToCustom = date => new Date(+date).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
exports.dateWithWeekday = date => new Date(+date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })

// new Date(date).toLocaleString('en-US', { timezone: 'Asia/Karachi' })