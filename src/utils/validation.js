import Validator from "validatorjs";

const validate = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

export const registerValidation = async (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:6",
    username: "required|alphanumeric",
  };

  await validate(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    }
    next();
  }).catch((err) => console.log(`[Error validation register] => ${err}`));
};

export const loginValidation = async (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:6",
  };

  await validate(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    }
    next();
  }).catch((err) => console.log(`[Error validation login] => ${err}`));
};
