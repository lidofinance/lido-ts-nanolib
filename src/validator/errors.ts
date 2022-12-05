export class ValidationError extends Error {
  validatedData?: unknown
  constructor(message, validatedData?: unknown) {
    super(message)
    this.validatedData = validatedData
  }
}
export const makeError = (
  message: string | number | undefined,
  defaultMessage: string
) => {
  const msg =
    typeof message === 'undefined' || typeof message === 'number'
      ? defaultMessage
      : message
  throw new ValidationError(msg)
}
