const request = require('postman-request');

const getPrice = (currency, dateStart, dateEnd, callback) => {
    const url = `https://api.nomics.com/v1/currencies/sparkline?key=f37d0ab0416b93f3a2809917aa60d8c7&ids=${currency}&start=${dateStart}T00%3A00%3A00Z&end=${dateEnd}T00%3A00%3A00Z`;

    request(url, function (error, response) {
        if (error) {
            callback("Problemas", undefined);
            //console.log("Problemas con la API")
        } else {
            const data = JSON.parse(response.body);
            if (data.error) {
                callback(data.error.info, undefined);
                //console.log("la data tiene un error");
            } else {
                callback(undefined, data);
                console.log(data);
            }
        }
        //console.log(JSON.parse(response.body));
    });
};

//getPrice('BTC', '2020-12-30', '2021-01-01');

module.exports = {
    getPrice
}