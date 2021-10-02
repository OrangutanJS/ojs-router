import createUrlObject from "../createUrlObject";

const DEFAULT_URL = new URL(window.location.href);
// const DEFAULT_URL = new URL('window');

describe('createUrlObject tests', () => {
  it('returns correct URL object when no path given', () => {
    // when
    const result = createUrlObject();

    // then
    expect(result).toBeInstanceOf(URL);

    // then
    expect(result.toString()).toBe(DEFAULT_URL.toString());
  });

  it('returns path when path is URL object', () => {
    // given
    const path = new URL('http://examplepath.com/test');

    // when
    const result = createUrlObject(path);

    // then
    expect(result).toBe(path);
  });

  it('returns path when path is URL object and originPrefix is given', () => {
    // given
    const path = new URL('http://examplepath.com/test');
    const originPrefix = '/prefix';

    // when
    const result = createUrlObject(path, originPrefix);

    // then
    expect(result).toBe(path);
  });

  it('returns correct URL object when originPrefix is given', () => {
    // given
    const originPrefix = '/examplePrefix';
    const expectedHref = window.location.origin + originPrefix;

    // when
    const result = createUrlObject('', originPrefix);

    // then
    expect(result.toString()).toBe(expectedHref);
  });

  it('returns correct URL object when search parameters are given', () => {
    // given
    const searchParameters = '?key1=value1&key2';
    const pathWithSearchParameters = '/test' + searchParameters;
    const expectedHref = window.location.origin + pathWithSearchParameters;

    // when
    const result = createUrlObject(pathWithSearchParameters);

    // then
    expect(result.toString()).toBe(expectedHref);
    expect(result.search).toBe(searchParameters);
  });

  it('returns correct URL object when hash parameter are given', () => {
    // given
    const hashParameter = '#exampleHash';
    const pathWithHashParameter = '/test' + hashParameter;
    const expectedHref = window.location.origin + pathWithHashParameter;

    // when
    const result = createUrlObject(pathWithHashParameter);

    // then
    expect(result.toString()).toBe(expectedHref);
    expect(result.hash).toBe(hashParameter);
  });

  it('returns correct URL object when search parameters and hash are given', () => {
    // given
    const searchParameters = '?key1=value1&key2';
    const hashParameter = '#exampleHash';
    const pathWithParameters = '/test' + searchParameters + hashParameter;
    const expectedHref = window.location.origin + pathWithParameters;

    // when
    const result = createUrlObject(pathWithParameters);

    // then
    expect(result.toString()).toBe(expectedHref);
    expect(result.search).toBe(searchParameters);
    expect(result.hash).toBe(hashParameter);
  });
});
