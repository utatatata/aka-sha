const fold = (f, init, obj) =>
  Object.keys(obj).reduce((accum, key) => f(accum, key, obj[key]), init)

const map = (f, obj) =>
  fold((newObj, key, value) => ({ ...newObj, [key]: f(key, value) }), {}, obj)

const filter = (p, obj) =>
  fold(
    (newObj, key, value) =>
      p(key, value) ? { ...newObj, [key]: value } : newObj,
    {},
    obj
  )

const mapToKeys = (f, obj) => Object.keys(map(f, obj))
const mapToValues = (f, obj) => Object.values(map(f, obj))

const filterToKeys = (p, obj) => Object.keys(filter(p, obj))
const filterToValues = (p, obj) => Object.values(filter(p, obj))

const some = (p, obj) => Object.keys(obj).some(key => p(key, obj[key]))
const any = (p, obj) => Object.keys(obj).any(key => p(key, obj[key]))

module.exports = {
  fold,
  map,
  mapToKeys,
  mapToValues,
  filter,
  filterToKeys,
  filterToValues,
  some,
  any,
}
