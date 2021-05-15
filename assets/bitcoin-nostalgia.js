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
        resultElt.textContent = '🤔';
    }

    const twitterShare = document.querySelector('#btceur-twitter');

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
    
                const resFmt = formatter.format(res);
                resultElt.textContent = resFmt;

                const eurInvestedFmt = formatter.format(eurosInvestedInput.value);

                const twitterShareHref = twitterShare.getAttribute('href');
                const twitterShareURL = new URL(twitterShareHref);

                twitterShareURL.searchParams.set('text', `Si j'avais investi ${eurInvestedFmt} sur Bitcoin, aujourd'hui j'aurais ${resFmt}... Et toi ? https://blocs.fr/bitcoin-nostalgia`);

                twitterShare.setAttribute('href', twitterShareURL.href);
            } catch(e) {
                console.error(e, `Si c'est marqué 429, la limite de requête a été atteinte :(`);
                // e === 429 means request limit
                errorElt.style.visibility = 'visible';
            }
        });
    } catch (_) {
        errorElt.style.visibility = 'visible';
    }
})();

function getBTCCurrentPrice() {
    const apiURL = 'https://blockchain.info/tobtc?currency=EUR&value=1';
    const body = {
        method: 'GET',
    }
    return fetch(apiURL, body)
        .then(res => res.text())
        .then(value => 1 / value);
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

    const body = {
        method: 'GET',
        headers: {
            'X-CoinAPI-Key': '33FB9E6F-E14B-49DE-8B2C-17CDCA3E5DAA',
            'Accept': 'application/json',
        }
    }
    return fetch(apiURL + endpoint, body)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            return data.rate;
        });
}