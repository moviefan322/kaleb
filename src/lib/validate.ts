import validator from "validator";

export const validateEmail = (v: string) => validator.isEmail(v.trim());
export const validatePhone = (v: string) =>
  validator.isMobilePhone(v.trim(), "any", { strictMode: false });
