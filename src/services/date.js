function formatedDate (unixDate = Date.now()) {
  let validDate = new Date( unixDate * 1);

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = validDate.getFullYear();
  const month = months[validDate.getMonth()];
  const date = validDate.getDate();

  return `${date} ${month} ${year}`;
}

module.exports = { formatedDate }