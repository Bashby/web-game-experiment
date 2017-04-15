// Facilitate mixins and composable classes
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

// Facilitate mixins and composable classes
/** Any type that can construct *something*. */
export type Constructable = new (...args: any[]) => {};