const fs = require('fs');
const { clientIds, readingsPerClient, maxTimeSpreadInSeconds } = require('./constants.js');
const generateMockData = require('./generator/generator.js')
const data = require('./dataStorage/data.json');
const sortByDate = require('./utils/sortByDate.js');
const checkForHealthChange = require('./checkHealthChange.js/healthChangeChecker.js')



const mockData = generateMockData(clientIds, readingsPerClient, maxTimeSpreadInSeconds);
fs.writeFileSync('./dataStorage/data.json', JSON.stringify(sortByDate(mockData), null, 2), { encoding: 'utf-8' });





sortByDate(mockData);

const latestStatusChanges = checkForHealthChange(data);
console.log(latestStatusChanges);
fs.writeFileSync('./dataStorage/latest_health_readings.json', JSON.stringify(latestStatusChanges, null, 2), { encoding: 'utf-8' });


