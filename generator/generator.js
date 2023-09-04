const statusTypes = require("../statusTypes");
const constants = require('../constants.js')

function generateMockData(clientIds, readings, timespread) {
    const statusOptions = ["GREEN", "ORANGE", "RED", "PURPLE", "GRAY"];
    const mockData = [];
    const currentTime = new Date();

    for (const clientId of clientIds) {
        for (let i = 0; i < readings; i++) {
            const randomStatusIndex = Math.floor(Math.random() * statusOptions.length);
            let randomStatus = statusOptions[randomStatusIndex];
            let temperatureValue = null;
            
            if (randomStatus !== statusTypes.GRAY) {
                temperatureValue = parseFloat((Math.random() * (constants.highTemperature - constants.lowTemperature) + constants.lowTemperature).toFixed(1));
                if (temperatureValue >= 36.1 && temperatureValue <= 37.5) {
                    randomStatus = statusTypes.GREEN; 
                } else if (temperatureValue > 37.5 && temperatureValue <= 38.5) {
                    randomStatus = statusTypes.ORANGE; 
                } else if (temperatureValue >= 35 && temperatureValue < 36.1) {
                    randomStatus = statusTypes.PURPLE; 
                } else {
                    randomStatus = statusTypes.RED; 
                }
            }

            const readingTime = new Date(currentTime.getTime() - Math.random() * timespread * 1000);

            const reading = {
                patientId: clientId,
                time: readingTime.toISOString(),
                type: "TEMPERATURE_SENSOR_ONSKIN",
                value: {
                    temperatureC: temperatureValue,
                    status: randomStatus
                }
            };

            mockData.push(reading);
        }
    }

    return mockData;
}

module.exports = generateMockData;

