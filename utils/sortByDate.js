function sortByDate(mockData) {
    mockData.sort((a,b) => new Date(a) - new Date(b));
    return mockData
}



module.exports = sortByDate