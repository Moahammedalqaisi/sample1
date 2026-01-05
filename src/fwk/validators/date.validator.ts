import { Validate } from 'class-validator';

export function IsDateOrString(validationOptions?: any) {
  return function (object: object, propertyName: string) {
    Validate(
      (value: any) => {
        if (value instanceof Date) return true;
        if (typeof value === 'string') {
          const date = new Date(value);
          return !isNaN(date.getTime());
        }
        return false;
      },
      {
        message: 'date must be a valid Date or ISO string',
        ...validationOptions,
      },
    )(object, propertyName);
  };
}
