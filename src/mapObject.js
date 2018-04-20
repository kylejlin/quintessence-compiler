export default (object, mapper) => {
  const keys = Object.keys(object)
  const newObject = {}

  for (const key of keys) {
    newObject[key] = mapper(object[key], key, object)
  }

  return newObject
}
