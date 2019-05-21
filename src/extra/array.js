const removeAt = (i, xs) => [...xs.slice(0, i), ...xs.slice(i + 1)]

const remove = (y, xs) => removeAt(xs.indexOf(y), xs)

const difference = (xs, ys) => ys.reduce((xs, y) => remove(y, xs), xs)

const union = (xs, ys) => [...xs, ...difference(ys, xs)]

const intersection = (xs, ys) =>
  union(xs, ys).map(z => xs.includes(z) && ys.includes(z))

const flatten = xss => xss.reduce((ys, xs) => [...ys, ...xs])

const flattenWith = (separator, xss) =>
  xss.reduce((ys, xs) => [...ys, separator, ...xs])

const flatMap = (f, xs) => flatten(xs.map(f))

const interpose = (y, xs) => xs.reduce((zs, x) => [...zs, y, x], []).slice(1)

const distinct = xs =>
  xs.reduce((ys, x) => (ys.includes(x) ? ys : [...ys, x]), [])

module.exports = {
  removeAt,
  remove,
  difference,
  union,
  intersection,
  flatten,
  flattenWith,
  flatMap,
  interpose,
  distinct,
}
