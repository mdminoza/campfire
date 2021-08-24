const handleDuplicateKeyError = async (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  return res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = async (error, res) => {
  let errors = {};
  Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
  });
  return res.status(400).send(errors);
}

//error controller function
export const errorHandler = async (error, req, res, next) => {
  console.log(error.status, 'congrats you hit the error middleware');
  if(error.name === 'ValidationError') return error = handleValidationError(error, res); 
  if(error.code && error.code == 11000) return error = handleDuplicateKeyError(error, res);
  res.status(error.status || 500);
  res.json({
    error: {
			message: error.message,
		}
  });
  return res;
}