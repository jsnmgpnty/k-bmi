import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

/**
 * Returns validation errors based on ValidationPipes result
 * @param errors List of ValidationError
 * @returns ValidationError type
 */
export const throwValidationErrors = (errors: ValidationError[] = []) => {
  // if there are no errors but somehow we got here, throw UnhandledError
  if (errors.length === 0) {
    throw new HttpException(
      'Validation failed with no recorded errors. Weird!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  const setErrors = (
    response: ValidationErrorResponseItem[],
    currentErrors: ValidationError[],
    property?: string,
  ) => {
    for (const err of currentErrors) {
      const propertyName = property
        ? `${property}.${err.property}`
        : err.property;
      /* if there are children on the current error, call `setError`
       * with the current error property so that it will be appended
       * on the child error (ex: person.firstName) */
      if (err.children?.length > 0) {
        setErrors(response, err.children, propertyName);
        continue;
      }

      if (!err['contexts'] || !err.property) continue;
      const propError: ValidationErrorResponseItem = {
        property: propertyName,
        errors: [],
      };
      for (const prop in err['contexts']) {
        propError.errors.push(err['contexts'][prop]?.message);
      }
      response.push(propError);
    }
  };

  const responseObj = [];
  setErrors(responseObj, errors);
  throw new HttpException(responseObj, HttpStatus.UNPROCESSABLE_ENTITY);
};

interface ValidationErrorResponseItem {
  property: string;
  errors: string[];
}
