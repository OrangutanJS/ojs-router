import encodeSearchQuery from "../encodeSearchQuery";

const EXAMPLE_PARAMETERS_SETS = [
  {
    description: 'empty object',
    parameters: {},
    expectedQuery: ''
  }, {
    description: 'one parameter',
    parameters: {
      key1: 'value1',
    },
    expectedQuery: '?key1=value1'
  }, {
    description: 'multiple parameters',
    parameters: {
      key1: 'value1',
      key2: 'value2',
    },
    expectedQuery: '?key1=value1&key2=value2'
  }, {
    description: 'parameters with special chars',
    parameters: {
      'special key1': 'special value 1',
      key2: 'special?value&2'
    },
    expectedQuery: '?special%20key1=special%20value%201&key2=special%3Fvalue%262'
  }, {
    description: 'null',
    parameters: null,
    expectedQuery: ''
  }, {
    description: 'undefined',
    parameters: undefined,
    expectedQuery: ''
  }, {
    description: 'wrong parameters',
    parameters: {
      key1: {},
      key2: []
    },
    expectedQuery: ''
  }
]

describe('decodeSearchQuery - returning correctly', () => {
  EXAMPLE_PARAMETERS_SETS.forEach(example => {
    it(`returns correctly encoded query when ${example.description} given`, () => {
      // when
      const result = encodeSearchQuery(example.parameters);

      // then
      expect(typeof result).toBe('string');
      expect(result).toBe(example.expectedQuery);
    });
  });

});
