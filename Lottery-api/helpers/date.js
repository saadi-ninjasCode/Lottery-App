exports.dateToString = date => new Date(date).toISOString();
exports.dateToLocal = date => new Date(date).toLocaleString();
exports.dateTolocalDate = date => new Date(date).toLocaleDateString();

// new Date(date).toLocaleString('en-US', { timezone: 'Asia/Karachi' })