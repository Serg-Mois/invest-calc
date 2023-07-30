class Share {
  constructor(buyPrice, exchangeRate) {
    this.buyPrice = buyPrice;
    this.exchangeRate = exchangeRate;
  }
}

function calculate() {
  // changeable params start
  const years = 12;
  const annualPlus = 36000;
  const dividendRate = 0.014;
  const annualSharesGrowth = 0.08;
  const initialExchangeRate = 36.6;
  const initialCash = 160000;
  const devaluationRate = 0.1;
  const tax = 0.195;
  const inflationRate = 0.05;
  let annualMinus = 60000;
  // changeable params end

  const shares = [];

  let sharePrice = 378;
  let cash = initialCash + annualPlus;
  let sharesAmount = 0;
  let currentPortfolio = 0;
  let currentExchangeRate = initialExchangeRate;
  let totalInvestments = cash;
  let totalTaxes = 0;

  buyShares();

  for (let i = 0; i < years - 1; i++) {
    cash = currentPortfolio * dividendRate;
    cash += annualPlus;
    totalInvestments += annualPlus;

    sharePrice += sharePrice * annualSharesGrowth;
    currentExchangeRate += currentExchangeRate * devaluationRate;
    buyShares();
  }

  function buyShares() {
    let newSharesAmount = cash / sharePrice;
    sharesAmount += newSharesAmount;
    cash = 0;
    currentPortfolio = sharesAmount * sharePrice;
    for (let i = 0; i < newSharesAmount; i++) {
      shares.push(new Share(sharePrice, currentExchangeRate));
    }
  }

  function sellShares() {
    for (let share of shares) {
      const profitInLocalCurrency =
        sharePrice * currentExchangeRate - share.buyPrice * share.exchangeRate;
      const shareTax = profitInLocalCurrency * tax;
      totalTaxes += shareTax / currentExchangeRate;
    }
  }

  sellShares();

  const portfolioAfterTaxes = currentPortfolio - totalTaxes;
  const percentGrowth =
    ((portfolioAfterTaxes - totalInvestments) / totalInvestments) * 100;

  console.log(
    `After ${years} years of investment $${annualPlus} annually into stocks, with initial cash $${initialCash}.`
  );
  console.log(`
  Where mean dividends rate       ${(dividendRate * 100).toFixed(2)}%,
  annual shares price growth      ${annualSharesGrowth * 100}%,
  devaluation rate                ${devaluationRate * 100}%
  tax                             ${tax * 100}%,
  and inflation rate              ${inflationRate * 100}%.
  
  Result:`);

  console.log(`Total investments        $${totalInvestments.toFixed(2)}`);
  console.log(
    `Current exchange rate    ${currentExchangeRate.toFixed(2)} UAH to 1 USD`
  );
  console.log(`Portfolio price          $${currentPortfolio.toFixed(2)}`);
  console.log(`Total taxes              $${totalTaxes.toFixed(2)}`);
  console.log(`Portfolio after taxes    $${portfolioAfterTaxes.toFixed(2)}`);
  console.log(`result                   ${percentGrowth.toFixed(2)}%`);

  let yearsToSpendAll = 1;

  function sellSharesGradually() {
    while (true) {
      let currentWithdrawal = 0;
      while (currentWithdrawal < annualMinus) {
        const share = shares.shift();
        if (!share) {
          return;
        }
        sharesAmount--;
        currentWithdrawal += sharePrice;

        const profitInLocalCurrency =
          sharePrice * currentExchangeRate -
          share.buyPrice * share.exchangeRate;
        const shareTax = profitInLocalCurrency * tax;
        currentWithdrawal -= shareTax / currentExchangeRate;
      }

      currentPortfolio = sharesAmount * sharePrice;
      cash = currentPortfolio * dividendRate + currentWithdrawal - annualMinus;

      sharePrice += sharePrice * annualSharesGrowth;
      currentExchangeRate += currentExchangeRate * devaluationRate;
      buyShares();

      annualMinus += annualMinus * inflationRate;
      yearsToSpendAll++;
      if (yearsToSpendAll > 200) {
        return;
      }
    }
  }
  console.log("_______________________________");

  console.log(
    `OR If after ${years} years, you will stop depositing and start to withdraw $${(
      annualMinus / 12
    ).toFixed(0)} monthly`
  );

  sellSharesGradually();

  console.log(`You can spend it for ${yearsToSpendAll} years`);
  console.log(
    `And at the end - monthly withdraw amount with inflation will be - $${(
      annualMinus / 12
    ).toFixed(0)}`
  );

  return totalTaxes;
}

calculate();
