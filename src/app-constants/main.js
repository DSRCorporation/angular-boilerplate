export default {
  version: '12WebAppVersion',
  dialogButtons: {
    CANCEL: 0,
    OK: 1,
    YES: 2,
    NO: 3
  },
  errorCodes: {
    UNKNOWN_ERROR: 100,
    VALIDATION_ERROR: 101,
    NOT_FOUND_ERROR: 102,
    SCHEMA_VALIDATION_ERROR: 103,
    UNAUTHORIZED_ERROR: 104,
    ALREADY_EXISTS_ERROR: 105,
    EMAIL_IS_NOT_VERIFIED_ERROR: 106,
    INTERNAL_SERVER_ERROR: 500
  },
  localStorageKeys: {
    authToken: 'authToken'
  }
}
