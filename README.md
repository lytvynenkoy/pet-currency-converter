
    <h1>Currency Converter 🌍</h1>
    <p>
        This is a simple and lightweight <strong>Currency Converter</strong> built with JavaScript,
        using the <strong>National Bank of Ukraine API</strong>. It allows users to convert amounts
        between currencies in real-time, view key exchange rates (USD, EUR, GBP), and dynamically
        populate a list of available currencies.
    </p>
    
    <h2>Features 🚀</h2>
    <ul>
        <li><strong>Real-time conversion</strong> using up-to-date exchange rates from the National Bank of Ukraine.</li>
        <li><strong>Dynamic currency selection</strong> for both base and target currencies.</li>
        <li><strong>Quick access</strong> to exchange rates for USD, EUR, and GBP.</li>
        <li><strong>Language switching support</strong> (optional for multilingual projects).</li>
    </ul>
    
    <h2>How It Works 🛠️</h2>
    <ol>
        <li>
            <strong>Fetching Exchange Rates</strong><br>
            The app fetches live exchange rate data from the
            <a href="https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json">NBU API</a>.
            This data is parsed into a JavaScript object, where each currency code is mapped to its exchange rate.
            <pre><code>
async function getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    rates = data.reduce((acc, currency) =&gt; {
        acc[currency.cc] = currency.rate;
        return acc;
    }, {});
    rates['UAH'] = 1.0; // Base rate for UAH
}
            </code></pre>
        </li>
        <li>
            <strong>Displaying Key Currencies</strong><br>
            The rates for USD, EUR, and GBP are displayed in dedicated elements for quick reference.
            <pre><code>
function displayMainCurrencies() {
    if (rates.USD) elementUSD.textContent = `${rates.USD}`;
    if (rates.EUR) elementEUR.textContent = `${rates.EUR}`;
    if (rates.GBP) elementGBP.textContent = `${rates.GBP}`;
}
            </code></pre>
        </li>
        <li>
            <strong>Dynamic Dropdown Population</strong><br>
            All available currencies are dynamically added to dropdown menus.
            <pre><code>
function populateSelectOptions(selectElement) {
    Object.keys(rates).forEach(currencyCode =&gt; {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.textContent = currencyCode;
        selectElement.appendChild(option);
    });
}
            </code></pre>
        </li>
        <li>
            <strong>Real-Time Conversion</strong><br>
            The app listens for changes in the input field and dropdown menus. It calculates the converted amount using the formula:
            <p><em>Result = (Input Amount × Base Currency Rate) / Target Currency Rate</em></p>
            <pre><code>
function updateResult() {
    const baseCurrency = exampleFormControlSelect1.value;
    const targetCurrency = select.value;
    if (baseCurrency &amp;&amp; targetCurrency &amp;&amp; rates[baseCurrency] &amp;&amp; rates[targetCurrency]) {
        const baseRate = rates[baseCurrency];
        const targetRate = rates[targetCurrency];
        result.value = ((parseFloat(input.value) * baseRate) / targetRate).toFixed(2);
    } else {
        result.value = '';
    }
}
            </code></pre>
        </li>
        <li>
            <strong>Error Handling</strong><br>
            If the API fails or data is invalid, the app logs an error to the console and prevents crashes.
            <pre><code>
catch (error) {
    console.error('Error fetching exchange rates:', error);
}
            </code></pre>
        </li>
    </ol>
    
    <h2>How to Use 🧑‍💻</h2>
    <ol>
        <li>Enter the amount to convert in the <strong>input field</strong>.</li>
        <li>Choose the <strong>base currency</strong> (the one you have) from the first dropdown.</li>
        <li>Choose the <strong>target currency</strong> (the one you want) from the second dropdown.</li>
        <li>View the converted amount in the <strong>result field</strong>.</li>
        <li>Check quick exchange rates for USD, EUR, and GBP at the top.</li>
    </ol>
    
    <h2>File Structure 📂</h2>
    <pre><code>
.
├── index.html         # Main HTML file
├── style.css          # Optional styles for the converter
├── script.js          # JavaScript code for functionality
    </code></pre>
    
    <h2>Requirements 📋</h2>
    <ul>
        <li><strong>Browser</strong> with support for modern JavaScript (ES6+).</li>
        <li><strong>Internet connection</strong> to fetch live rates from the NBU API.</li>
    </ul>
    
    <h2>Possible Improvements ✨</h2>
    <ul>
        <li>Add support for multiple languages (e.g., English and Ukrainian).</li>
        <li>Include historical exchange rate charts for better insights.</li>
        <li>Implement offline functionality with cached rates.</li>
    </ul>
    
    <p>Feel free to fork, contribute, or share your feedback. Together, let's make currency exchange smarter and easier! 😊</p>

