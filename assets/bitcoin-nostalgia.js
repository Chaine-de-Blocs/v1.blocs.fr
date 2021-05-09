const apiURL = 'https://rest.coinapi.io';

(async function() {

    const yearPicker = document.querySelector('#year-picker');

    for (let i = 2011; i <= new Date().getFullYear(); i++) {
        const opt = document.createElement('option');
        opt.text = i;
        opt.value = i;
        yearPicker.add(opt);
    }
    yearPicker.options[yearPicker.options.length - 1].selected = true;

    const resultElt = document.querySelector('#pl-result');
    const action = document.querySelector('#wanna-cry');
    const eurosInvestedInput = document.getElementsByName('euros-invested')[0];
    
    yearPicker.addEventListener('change', () => {
        reset();
    });
    eurosInvestedInput.addEventListener('change', () => {
        reset();
    })

    const errorElt = document.querySelector('#error-display');

    const reset = () => {
        errorElt.style.visibility = 'hidden';
        resultElt.textContent = '...';
    }

    try {
        const currentPrice = await getBTCCurrentPrice();
        action.addEventListener('click', async (_) => {
            try {
                const date = new Date();
                date.setFullYear(+yearPicker.value);
                const rate = await getPrice(date);
                const qtyBTC = (+eurosInvestedInput.value) / rate;
    
                const res = (qtyBTC * currentPrice).toFixed(2);
    
                var formatter = new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    currencyDisplay: 'code',
                });
    
                resultElt.textContent = formatter.format(res);
            } catch(status) {
                // status === 429 means request limit
                errorElt.style.visibility = 'visible';
            }
        });
    } catch (_) {
        errorElt.style.visibility = 'visible';
    }
})();

function getBTCCurrentPrice() {
    const apiURL = 'https://blockchain.info/tobtc?currency=EUR&value=1';
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        
        req.onreadystatechange = function(_) {
            if (this.readyState === 4 && this.status === 200) {
                if (typeof req.response !== 'string') {
                    reject();
                    return;
                }
                resolve(1 / req.response);
            } else if (this.readyState === 4) {
                reject();
            }
        }
        
        req.open('GET', apiURL, true);
        req.send();
    });
}

function getPrice(date /* Date */) {
    date.setDate(date.getDate() - 1);
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1;
    let dd = date.getDate();

    if (MM <= 9) {
        MM = '0' + MM;
    }
    if (dd <= 9) {
        dd = '0' + dd;
    }

    const endpoint = `/v1/exchangerate/BTC/EUR?time=${yyyy}${MM}${dd}`;

    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        
        req.onreadystatechange = function(e) {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(req.responseText);
                if (data.rate) {
                    resolve(data.rate);
                }
            } else if (this.readyState === 4) {
                reject(this.status);
            }
        }
        
        req.open('GET', apiURL + endpoint, true);
        req.setRequestHeader('X-CoinAPI-Key', '33FB9E6F-E14B-49DE-8B2C-17CDCA3E5DAA');
        req.setRequestHeader('Accept', 'application/json');
        req.send();
    });
}