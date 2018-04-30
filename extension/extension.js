$(function() {

    ajax({
        type: "GET",
        url: "https://api.fairplayground.info/rawdata/faircoin_prices.csv",
    }, processData);


    function processData(data) {
        if(data) priceData = csvToArray(data);
        //   $(".inner-cont").append("priceData: ");
        //   $(".inner-cont").append(priceData);

        if (priceData) {

        	var heads = '<th>Official Rate</th><th>Official Value</th><th>Market Value</th>';
    		$("thead tr").append(heads);

            $('tbody  > tr').each(function() {


                var dateVar = $(this).find('td:first').text();
                var d = new Date(dateVar);
                var dateISO = d.toISOString().slice(0, 10);

                var faircoins = $(this).find('td:nth-child(3)').text();

                // 		$(this).append('<td>'+faircoins+'</td>');

                calculateEuros(dateISO, faircoins, this);

            });
        }
    };

    function calculateEuros(date, faircoins, el) {

        if (!faircoins) {
            console.log("please, fill the faircoin input box");
            return;
        }
        if (!date) {
            console.log("no date");
            return;
        }

        //let's find the date in the priceData
        var selectedPriceData = [];
        for (var i = 0; i < priceData.length; i++) {
            if (priceData[i][0] == date) {
                selectedPriceData = priceData[i];
            }
        }
        if (selectedPriceData.length < 1) {
            console.log("selected date not found in the dataset");
            return;
        }

//         console.log(selectedPriceData);

        var euros = faircoins * selectedPriceData[3];
        var market = faircoins * selectedPriceData[2];


        $(el).append('<td>' + parseFloat(selectedPriceData[3]).toString() + '</td>');
        $(el).append('<td>€ ' + (Math.round(euros * 100) / 100) + '</td>');
        $(el).append('<td>€ ' + (Math.round(market * 100) / 100) + '</td>');
    }

    function ajax (options, callback) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, options.async || true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                return callback(xhr.responseText);
            }
        };
        return xhr.send();
    };

    function csvToArray(csv) {
        var a1 = csv.split("\n");
        var r = [];
        for (var i = 0; i < a1.length; i++) {
            var a2 = a1[i].split(",");
            r.push(a2);
        }
        return (r);
    }


});