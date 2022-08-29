module.exports = {
  loginSchema: {
    password: {
      in: ['body'],
      notEmpty: true,
      errorMessage: "Password must be provided",
    },
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: "Email provided should be valid"
      },
      normalizeEmail: true,
      errorMessage: "Email must be provided"
    }
  }
};