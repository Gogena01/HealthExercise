const constants = require("../constants");

function isValidTimeChange(last, current) {
   const timeDiff = current - last;
   return timeDiff > constants.HEALTH_READING_INTERVAL;
}


module.exports = isValidTimeChange;