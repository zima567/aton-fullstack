//Status codes for http/api responses
const status = {
    success: {
      RECORD_CREATED: "New record created successfully",
      UPDATE_SUCCEEDED: "Record has been successfully updated",
      AUTHENTICATION_SUCCEED: "Successfully authenticated"
    },
    error: {
        RECORD_CREATION_FAILED: "Failed to create new record",
        UPDATE_FAILED: "Could not update record",
        AUTHENTICATION_FAILED: "Authentication failed",
        MISSING_REQUIRED_PARAMS: "The request is missing required params",
        INCORRECT_CREDENTIALS: "Make sure your password or login match requirements",
        DUBLICATE_ACCOUNT: "User with such credentials already existed",
        NO_USER_WITH_CREDENTIALS: "No user found with such credentials",
        WRONG_CREDENTIALS: "Make sure you enter the correct login or password",
        DATA_FETCH_FAILED: "Could not fetch data from the database",
        AUTHENTICATION_REQUIRED: "Authentication required"
    }
}

/**
 * General response format
 * { code: <code>, message: <message>, data: {<attributes>}}
 */
const defaultApiResponse = {code: "", message: "", data: {}};

module.exports = {
    status,
    defaultApiResponse
}