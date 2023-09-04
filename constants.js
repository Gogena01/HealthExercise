module.exports=  {
    HEALTH_READING_INTERVAL: 3600,
    clientIds: [12312, 53213, 65324],
    readingsPerClient: 5,
    maxTimeSpreadInSeconds: 86400,
    validChanges: [
        ['GREEN', 'RED'],
        ['GREEN', 'ORANGE'],
        ['RED', 'GREY'],
        ['GRAY', 'ORANGE'],
        ['GRAY', 'RED'],
        ['ORANGE', 'RED'],
        ['GREEN', 'GRAY']
    ],
    highTemperature:41.5,
    lowTemperature:35
}

