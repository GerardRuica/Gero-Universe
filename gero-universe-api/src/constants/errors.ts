export const ERRORS = {
  USER: {
    NOT_FOUND: {
      status: 404,
      code: "USER_NOT_FOUND",
      message: "User not found",
    },
    INVALID_CREDENTIALS: {
      status: 401,
      code: "USER_INVALID_CREDENTIALS",
      message: "Invalid email or password",
    },
    REGISTERED_EMAIL: {
      status: 400,
      code: "USER_REGISTERED_EMAIL",
      message: "Email already registered",
    },
  },
  PERMISSIONS: {
    DENIED: {
      status: 403,
      code: "PERMISSION_DENIED",
      message: "Insufficient permissions to access this resource",
    },
    NOT_FOUND: {
      status: 404,
      code: "PERMISSION_NOT_FOUND",
      message: "Permission not found",
    },
  },
  MONGO: {
    DUPLICATE_KEY: {
      status: 400,
      code: "11000",
      message: "Duplicate key on:",
    },
  },
};
