document
  .getElementById("calculate-button")
  .addEventListener("click", calculateRepayments);

function calculateRepayments() {
  const amountInput = document.getElementById("amount");
  const termInput = document.getElementById("term");
  const rateInput = document.getElementById("rate");
  const repaymentCheckbox = document.getElementById("repayment");
  const interestOnlyCheckbox = document.getElementById("interestOnly");
  var txt = "";

  if (!amountInput.checkValidity()) {
    txt = amountInput.validationMessage;
    document.getElementById("inputsign").style.backgroundColor =
      "hsl(var(--red))";
    document.getElementById("mortgage_amount").style.borderBlockColor =
      "hsl(var(--red))";
    document.getElementById("amount_error").textContent = txt;
    return;
  } else {
    document.getElementById("inputsign").style.backgroundColor =
      "hsl(var(--slate-100))";
    document.getElementById("mortgage_amount").style.borderBlockColor =
      "hsl(var(--slate-700))";
    document.getElementById("amount_error").textContent = txt;
  }

  if (!termInput.checkValidity()) {
    // alert("Please enter a valid mortgage term.");
    txt = termInput.validationMessage;
    document.getElementById("inputsign2").style.backgroundColor =
      "hsl(var(--red))";
    document.getElementById("mortgage-term").style.borderBlockColor =
      "hsl(var(--red))";
    document.getElementById("term_error").textContent = txt;
    return;
  } else {
    document.getElementById("inputsign2").style.backgroundColor =
      "hsl(var(--slate-100))";
    document.getElementById("mortgage-term").style.borderBlockColor =
      "hsl(var(--slate-700))";
    document.getElementById("term_error").textContent = txt;
  }

  if (!rateInput.checkValidity()) {
    txt = rateInput.validationMessage;
    document.getElementById("inputsign-rate").style.backgroundColor =
      "hsl(var(--red))";
    document.getElementById("mortgage-rate").style.borderBlockColor =
      "hsl(var(--red))";
    document.getElementById("rate_error").textContent = txt;
    return;
  }

  if (!repaymentCheckbox.checked && !interestOnlyCheckbox.checked) {
    // alert("Please select at least one mortgage type.");
    txt = "Please select at least one mortgage type.";
    document.getElementById("type_error").textContent = txt;
    return;
  } else {
    document.getElementById("type_error").textContent = txt;
  }

  const amount = parseFloat(amountInput.value);
  const term = parseFloat(termInput.value) * 12; // Convert years to months
  const rate = parseFloat(rateInput.value) / 100 / 12; // Monthly interest rate

  let monthlyRepayments = 0,
    totalRepay = 0;

  if (repaymentCheckbox.checked) {
    monthlyRepayments += (amount * rate) / (1 - Math.pow(1 + rate, -term));
    totalRepay += monthlyRepayments * term;
  }

  if (interestOnlyCheckbox.checked) {
    const interestOnlyMonthlyRepayments = amount * rate;
    monthlyRepayments += interestOnlyMonthlyRepayments;
    totalRepay += interestOnlyMonthlyRepayments * term + amount;
  }

  document.getElementById("monthly-repayments").textContent =
    monthlyRepayments.toFixed(2);
  document.getElementById("total-repay").textContent = totalRepay.toFixed(2);
  document.getElementById("resultsDisplay").style.display = "grid"; //to grid
  document.getElementById("results").style.display = "none"; //to none
}
