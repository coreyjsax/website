exports.dateTime = (format) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let yearString = JSON.stringify(yyyy)
    let shortYear = yearString.slice(2, 4)

    if(dd < 10) {
        dd = '0'+dd
    }
    if (mm < 10) {
        mm = '0'+ mm
    }
    today = mm + '/' + dd + '/' + yyyy;
    if (format !== 'beer-print'){
        return today;
    } else if (format == 'beer-print'){
        let beerPrintDate = mm + '/' + dd + '/' + shortYear
        return beerPrintDate
    }
}

exports.errorHandler = (status, model) => {
    let message
    if (status === 404){
        message = "No Content"
    } else if (status === 400){
        message === "Malformed request"
    } else if (status === 500)
    return message
}