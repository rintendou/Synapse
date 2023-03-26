export const validateBodyCompleteness = (payload: []) => {
  const isBodyComplete = payload.every((key) => typeof key !== undefined)
  return isBodyComplete
}

export const validateParamsCompleteness = (payload: []) => {
  const areParamsComplete = payload.every((key) => typeof key !== undefined)
  return areParamsComplete
}
