function handleError(err) {
  const errors = { email: "", password: "" };

  for (let keys in errors) {
    if (err.message.includes(keys)) {
      errors[keys] = `Please enter ${keys}`;
    }
  }
  if (err.code === 11000) {
    errors.email = "This email is registered";
    return errors;
  }
  return errors;
}

module.exports = handleError;
