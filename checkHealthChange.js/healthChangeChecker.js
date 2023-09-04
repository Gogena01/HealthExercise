const isValidChange = require('../utils/isValidChnage.js');
const isValidTimeChange = require('../utils/isValidTimeChange.js')
const isoStringConverter = require('../utils/isoConverter.js');

function checkForHealthChange(data, MAX_TIME_INTERVAL) {
    const latestStatusChange = {};

    for (const reading of data) {
        const { patientId, time, value } = reading;

        if (!latestStatusChange.hasOwnProperty(patientId)) {
            latestStatusChange[patientId] = {
                healthChanged: false,
                change: null,
                last: {
                    status: value.status,
                    value: value.temperatureC,
                    time: time
                }
            };
        } else {
            const lastTime = isoStringConverter(latestStatusChange[patientId].last.time);
            const currentTime = isoStringConverter(time);


            if (isValidChange(latestStatusChange[patientId].last.status, value.status) &&
                isValidTimeChange(lastTime, currentTime)) {
                const lastStatus = latestStatusChange[patientId].last.status;

                latestStatusChange[patientId].healthChanged = true;
                if (!latestStatusChange[patientId].change) {
                    latestStatusChange[patientId].change = {
                        from: lastStatus,
                        to: value.status,
                        value: value.temperatureC || null,
                        changedOn: time,
                    };
                } else {
                    latestStatusChange[patientId].change.from = lastStatus;
                    latestStatusChange[patientId].change.to = value.status;
                }

                latestStatusChange[patientId].last = {
                    status: value.status,
                    value: value.temperatureC || null,
                    time: time
                };
            } else if (latestStatusChange[patientId].change) {
                const prevChange = latestStatusChange[patientId].change;
                if (prevChange.to === value.status && isValidTimeChange(prevChange.changedOn, time, MAX_TIME_INTERVAL)) {
                    latestStatusChange[patientId].change.changedOn = time;
                }
            }
        }
    }

    const result = [];
    for (const patientId in latestStatusChange) {
        const { healthChanged, change, last } = latestStatusChange[patientId];
        if (!healthChanged) {
            result.push({
                patientId: patientId,
                healthChanged: false,
                last: last
            });
        } else {
            result.push({
                patientId: patientId,
                healthChanged: true,
                change: change
            });
        }
    }

    return result;
}

module.exports = checkForHealthChange;
