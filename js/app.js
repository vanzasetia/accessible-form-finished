const form = document.querySelector(".js-form");
const inputs = document.querySelectorAll(".js-input");
const alerts = document.querySelectorAll(".js-alert");

const clearAllAlerts = () => {
  alerts.forEach((alert) => (alert.textContent = ""));
  inputs.forEach((input) => input.classList.remove("is-invalid"));
};

const showAlertMessage = ({ input, alert, message }) => {
  alert.textContent = message;
  input.classList.add("is-invalid");
};

const handleAlert = (input, message) => {
  alerts.forEach((alert) => {
    const inputID = input.dataset.id;
    const alertID = alert.dataset.id;
    if (inputID === alertID) {
      showAlertMessage({ input, alert, message });
    }
  });
};

const isInputFilled = (input, value) => {
  const isFilled = !!value;
  if (!isFilled) {
    handleAlert(input, `This ${input.dataset.id} input is required`);
  }
  return isFilled;
};

const validateEmail = (input, email) => {
  const emailValidation =
    /^(?:[a-z0-9.]){2,30}@{1}(?:[a-z0-9-]){2,30}\.{1}(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/;
  const isValid = emailValidation.test(email);
  if (!isValid) {
    handleAlert(input, "Please provide a valid email address");
  }
  return isValid;
};

const checkAllInputs = () => {
  let isNameFilled = false;
  let isEmailFilled = false;
  let isEmailValid = false;

  inputs.forEach((input) => {
    const id = input.dataset.id;
    const value = input.value;
    switch (id) {
      case "name":
        isNameFilled = isInputFilled(input, value);
        break;
      case "email":
        isEmailFilled = isInputFilled(input, value);
        if (isEmailFilled) {
          isEmailValid = validateEmail(input, value);
        }
        break;
      default:
        console.error(`${id} input doesn't exist`);
    }
  });

  const areAllInputsValid = isNameFilled && isEmailFilled && isEmailValid;
  return areAllInputsValid;
};

const validateForm = (event) => {
  clearAllAlerts();
  const isFormValid = checkAllInputs();
  if (!isFormValid) {
    event.preventDefault();
  }
};

form.addEventListener("submit", validateForm);
