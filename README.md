You can change next params:

years = 12; // years from now
annualPlus = 36000; // annual deposit in $
dividendRate = 0.014; // 1.4% - mean dividends rate of chosen stock
annualSharesGrowth = 0.08; // 8% - expected annual stock price growth
initialExchangeRate = 36.6; // current local currency exchange rate (e.g. 36.6 uah to 1 usd)
initialCash = 160000; // amount of cash that you initially have and it will be used to buy stocks at once,
devaluationRate = 0.1; // 10% - expected annual currency devaluation rate 
tax = 0.195; // 19.5% - current/expected capital gains tax
inflationRate = 0.05; // 5% expected annual inflation rate


***
run "node invest.js" and see result in console:

For example:
***
node invest.js

After 12 years of investment $36000 annually into stocks, with initial cash $160000.

  Where mean dividends rate       1.40%,
  annual shares price growth      8%,
  devaluation rate                10%
  tax                             19.5%,
  and inflation rate              5%.

  Result:
Total investments        $592000.00
Current exchange rate    104.42 UAH to 1 USD
Portfolio price          $1172460.86
Total taxes              $153108.00
Portfolio after taxes    $1019352.86
result                   72.19%
_______________________________
OR If after 12 years, you will stop depositing and start to withdraw $5000 monthly
You can spend it for 26 years
And at the end - monthly withdraw amount with inflation will be - $16932


*** 
It includes taxes when the gain is calculated in local currencies, so if you buy something for $100 while the exchange rate was 20 uah to 1 usd, and sell it for $100, but exchange was already 30 uah to 1 usd - you need to pay 19.5% from currency exchange difference:

100*30-100*20=1000 uah
1000*19.5% = 195 uah

100 usd - ( 195 uah / 30 ) = 94.5 usd ( -5.5%)

in results we see that such taxes logic has no much impact in long term investments even with 10% deflation.