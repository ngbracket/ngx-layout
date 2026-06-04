import '@angular/compiler';
import './_private-utils/testing/custom-matchers';

// Set up ProxyZone for Vitest — equivalent to what zone.js/testing's jest patch does.
// This makes fakeAsync() and waitForAsync() work in Vitest.
// Uses a single shared ProxyZone but resets its delegate after each test
// to prevent task accumulation between tests.
declare const Zone: any;

if (typeof Zone !== 'undefined') {
  const ProxyZoneSpec = Zone['ProxyZoneSpec'];
  if (ProxyZoneSpec && !(Zone as any)['__vitest_zone_patched__']) {
    (Zone as any)['__vitest_zone_patched__'] = true;
    const rootZone = Zone.current;
    const proxyZoneSpec = new ProxyZoneSpec();
    const proxyZone = rootZone.fork(proxyZoneSpec);

    function wrapInProxyZone(fn: Function) {
      if (typeof fn !== 'function') return fn;
      return function (this: any, ...args: any[]) {
        return proxyZone.run(fn, this, args);
      };
    }

    const ctx = globalThis as any;

    // Wrap it/test (test body is 2nd arg)
    ['it', 'xit', 'fit', 'test', 'xtest'].forEach((name) => {
      const orig = ctx[name];
      if (orig && !orig.__zone_vitest__) {
        ctx[name] = function (...args: any[]) {
          if (typeof args[1] === 'function') {
            args[1] = wrapInProxyZone(args[1]);
          }
          return orig.apply(this, args);
        };
        ctx[name].__zone_vitest__ = true;
        Object.keys(orig).forEach((k) => {
          if (!(k in ctx[name])) ctx[name][k] = orig[k];
        });
      }
    });

    // Wrap beforeEach/afterEach/beforeAll/afterAll (fn is 1st arg)
    ['beforeEach', 'afterEach', 'beforeAll', 'afterAll'].forEach((name) => {
      const orig = ctx[name];
      if (orig && !orig.__zone_vitest__) {
        ctx[name] = function (...args: any[]) {
          if (typeof args[0] === 'function') {
            args[0] = wrapInProxyZone(args[0]);
          }
          return orig.apply(this, args);
        };
        ctx[name].__zone_vitest__ = true;
      }
    });

    // Reset the ProxyZone delegate after each test to prevent task accumulation
    const origAfterEach = ctx.afterEach;
    if (origAfterEach) {
      origAfterEach(() => {
        proxyZoneSpec.setDelegate(null);
      });
    }
  }
}
