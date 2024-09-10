const dateValidator = (value) => {
  const minDate = new Date("1900-01-01");
  const maxDate = new Date();
  return value >= minDate && value <= maxDate;
};

module.exports = dateValidator;
