/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { extendObject } from './object-extend';


describe('extendObject', () => {
  it('should extend an object', () => {
    const extended = extendObject({}, {x: 123});

    expect(extended).toEqual({x: 123});
  });

  it('should overwrite existing properties', () => {
    const extended = extendObject({x: 456}, {x: 123});

    expect(extended).toEqual({x: 123});
  });

  it('should add additional properties', () => {
    const extended = extendObject({x: 456}, {y: 123});

    expect(extended).toEqual({x: 456, y: 123});
  });

  it('should extend from multiple sources', () => {
    const extended = extendObject({}, {x: 123}, {y: 456});

    expect(extended).toEqual({x: 123, y: 456});
  });

  it('should overwrite properties from the later source', () => {
    const extended = extendObject({}, {x: 123}, {x: 456});

    expect(extended).toEqual({x: 456});
  });

  it('should treat null and undefined sources as empty objects', () => {
    const extended = extendObject({}, null, {x: 123}, undefined, {y: 456});

    expect(extended).toEqual({x: 123, y: 456});
  });

  it('should throw an error when the dest object is null', () => {
    expect(() => extendObject(null, {x: 123}))
        .toThrowError('Cannot convert undefined or null to object');
  });

  it('should throw an error when the dest object is undefined', () => {
    expect(() => extendObject(undefined, {x: 123}))
        .toThrowError('Cannot convert undefined or null to object');
  });
});
