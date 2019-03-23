const akasha = require('..')

describe('akasha', () => {
  describe('greet', () => {
    test("greet('AKAsha') to be 'Hello, AKAsha!'", () => {
      expect(akasha.greet('AKAsha')).toBe('Hello, AKAsha!')
    })
  })
})
