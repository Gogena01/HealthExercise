function isoStringConverter(isoStr) {
    let date = new Date(isoStr);
    return date.getTime() / 1000; 
}



module.exports = isoStringConverter;