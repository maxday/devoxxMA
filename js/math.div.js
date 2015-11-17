function div(firstNumber, secondNumber) {
  if(parseInt(secondNumber, 10) === 0) {
    throw new Error('Impossible to divide by zero');
  }
  return parseInt(firstNumber, 10) / parseInt(secondNumber, 10);
}
