const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');
const exampleFormControlSelect1 = document.querySelector('#exampleFormControlSelect1');
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

let rates = {};

getCurrencies();

async function getCurrencies() {
    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();
        rates = data.reduce((acc, currency) => {
            acc[currency.cc] = currency.rate;
            return acc;
        }, {});
        rates['UAH'] = 1.0;
        displayMainCurrencies();
        populateSelectOptions(select);
        populateSelectOptions(exampleFormControlSelect1);
        setDefaultSelection();
    } catch (error) {
        console.error('Помилка завантаження курсів валют:', error);
    }
}

function displayMainCurrencies() {
    if (rates.USD) elementUSD.textContent = `${rates.USD}`;
    if (rates.EUR) elementEUR.textContent = `${rates.EUR}`;
    if (rates.GBP) elementGBP.textContent = `${rates.GBP}`;
}

function populateSelectOptions(selectElement) {
    Object.keys(rates).forEach(currencyCode => {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.textContent = currencyCode;
        selectElement.appendChild(option);
    });
}

function setDefaultSelection() {
    exampleFormControlSelect1.value = 'UAH';
    select.value = 'USD';
    updateResult();
}

input.oninput = updateResult;
select.onchange = updateResult;
exampleFormControlSelect1.onchange = updateResult;

function updateResult() {
    const baseCurrency = exampleFormControlSelect1.value;
    const targetCurrency = select.value;
    if (baseCurrency && targetCurrency && rates[baseCurrency] && rates[targetCurrency]) {
        const baseRate = rates[baseCurrency];
        const targetRate = rates[targetCurrency];
        result.value = ((parseFloat(input.value) * baseRate) / targetRate).toFixed(2);
    } else {
        result.value = '';
    }
}