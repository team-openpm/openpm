import memoizeBase from 'lodash/memoize'

/*
 * This is a decorator that memoizes the result of a method.
 * Usage: @memoize() method() { ... }
 */
export function memoize() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    if (descriptor.get) {
      descriptor.get = memoizeBase(descriptor.get, function <T>(this: T): T {
        return this
      })
    } else {
      descriptor.value = memoizeBase(descriptor.value)
    }
  }
}
