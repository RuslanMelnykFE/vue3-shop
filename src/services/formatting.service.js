const formatedNumber = (value) => Intl.NumberFormat().format(value);

const formatedTextProducts = (amountsProducts) => {
  if (amountsProducts === 1) {
    return 'товар';
  }

  if (amountsProducts > 4 && amountsProducts < 21) {
    return 'товаров';
  }

  if (amountsProducts > 20) {
    const amountText = String(amountsProducts);
    const lastChar = Number(amountText[amountText.length - 1]);

    if (lastChar === 1) {
      return 'товар';
    }

    if ((lastChar > 4 && lastChar < 10) || lastChar === 0) {
      return 'товаров';
    }
  }

  return 'товара';
};
export { formatedNumber, formatedTextProducts };
