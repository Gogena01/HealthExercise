const constants = require('../constants.js');


function isValidChange(fromStatus, toStatus) {
    return constants.validChanges.some(change => change[0] === fromStatus && change[1] === toStatus);
}

module.exports = isValidChange