
# Currency Converter 🌍

This is a simple and lightweight **Currency Converter** built with JavaScript, using the **National Bank of Ukraine API**. It allows users to convert amounts between currencies in real-time, view key exchange rates (USD, EUR, GBP), and dynamically populate a list of available currencies.

---

## Features 🚀
- **Real-time conversion** using up-to-date exchange rates from the National Bank of Ukraine.
- **Dynamic currency selection** for both base and target currencies.
- **Quick access** to exchange rates for USD, EUR, and GBP.
- **Language switching support** (optional for multilingual projects).

---

## How It Works 🛠️

1. **Fetching Exchange Rates**  
   The app fetches live exchange rate data from the [NBU API](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json). This data is parsed into a JavaScript object, where each currency code is mapped to its exchange rate.

   ```javascript
   async function getCurrencies() {
       const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
       const data = await response.json();
       rates = data.reduce((acc, currency) => {
           acc[currency.cc] = currency.rate;
           return acc;
       }, {});
       rates['UAH'] = 1.0; // Base rate for UAH
   }
   ```

2. **Displaying Key Currencies**  
   The rates for USD, EUR, and GBP are displayed in dedicated elements for quick reference.

   ```javascript
   function displayMainCurrencies() {
       if (rates.USD) elementUSD.textContent = `${rates.USD}`;
       if (rates.EUR) elementEUR.textContent = `${rates.EUR}`;
       if (rates.GBP) elementGBP.textContent = `${rates.GBP}`;
   }
   ```

3. **Dynamic Dropdown Population**  
   All available currencies are dynamically added to dropdown menus. This ensures that the app supports all currencies provided by the API.

   ```javascript
   function populateSelectOptions(selectElement) {
       Object.keys(rates).forEach(currencyCode => {
           const option = document.createElement('option');
           option.value = currencyCode;
           option.textContent = currencyCode;
           selectElement.appendChild(option);
       });
   }
   ```

4. **Real-Time Conversion**  
   The app listens for changes in the input field and dropdown menus. Based on the selected currencies, it calculates the converted amount using the formula:

   ```
   Result = (Input Amount × Base Currency Rate) / Target Currency Rate
   ```

   ```javascript
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
   ```

5. **Error Handling**  
   If the API fails or data is invalid, the app logs an error to the console and prevents crashes.

   ```javascript
   catch (error) {
       console.error('Error fetching exchange rates:', error);
   }
   ```

---

## How to Use 🧑‍💻
1. Enter the amount to convert in the **input field**.
2. Choose the **base currency** (the one you have) from the first dropdown.
3. Choose the **target currency** (the one you want) from the second dropdown.
4. View the converted amount in the **result field**.
5. Check quick exchange rates for USD, EUR, and GBP at the top.

---

## File Structure 📂
```
.
├── index.html         # Main HTML file
├── style.css          # Optional styles for the converter
├── script.js          # JavaScript code for functionality
```

---

## Requirements 📋
- **Browser** with support for modern JavaScript (ES6+).
- **Internet connection** to fetch live rates from the NBU API.

---

## Possible Improvements ✨
- Add support for multiple languages (e.g., English and Ukrainian).
- Include historical exchange rate charts for better insights.
- Implement offline functionality with cached rates.

---

Feel free to fork, contribute, or share your feedback. Together, let's make currency exchange smarter and easier! 😊
