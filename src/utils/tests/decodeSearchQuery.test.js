import decodeSearchQuery from "../decodeSearchQuery";

const EXAMPLE_INCORRECT_QUERIES = [
  '',
  ' ',
  'key1',
  'key1=value1',
  undefined,
  null
];

const EXAMPLE_CORRECT_QUERIES = [
  {
    query: '?key1=value1',
    decoded: {
      key1: 'value1'
    }
  },
  {
    query: '?key1=value1&key2=value2',
    decoded: {
      key1: 'value1',
      key2: 'value2'
    }
  },
  {
    query: '?key1=special%20value%201',
    decoded: {
      key1: 'special value 1'
    }
  }
];

describe('decodeSearchQuery tests', () => {
  EXAMPLE_INCORRECT_QUERIES.forEach(query => {
    it(`returns empty object when there is incorrect query given ("${query}")`, () => {
      // when
      const result = decodeSearchQuery(query);

      // then
      expect(typeof result).toBe('object');
      expect(Object.keys(result).length).toBe(0);
    });
  });

  EXAMPLE_CORRECT_QUERIES.forEach(example => {
    it(`returns correct decoded object when there is correct query given ("${example.query}")`, () => {
      // when
      const result = decodeSearchQuery(example.query);

      //then
      expect(typeof result).toBe('object');
      expect(result).toMatchObject(example.decoded);
    });
  })

});
