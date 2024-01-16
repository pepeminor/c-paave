import { compareField, CompareFieldSchema } from 'utils';

const MockObject1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [
    {
      a: 1,
      b: 2,
    },
    {
      a: 3,
      b: 4,
    },
  ],
};

const MockObject2 = {
  a: 1,
  b: 3,
  c: {
    d: 3,
    e: 5,
  },
  f: [
    {
      a: 1,
      b: 7,
    },
    {
      a: 3,
      b: 9,
    },
  ],
};

const MockObject3 = [
  {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4,
    },
    f: [
      {
        a: 1,
        b: 2,
      },
      {
        a: 3,
        b: 4,
      },
    ],
  },
  {
    a: 1,
    b: 3,
    c: {
      d: 3,
      e: 5,
    },
  },
];

const MockObject4 = [
  {
    a: 1,
    b: 3,
    c: {
      d: 3,
      e: 5,
    },
    f: [
      {
        a: 1,
        b: 3,
      },
      {
        a: 3,
        b: 5,
      },
    ],
  },
  {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4,
    },
  },
];

type TestData<T> = {
  message: string;
  compareField: CompareFieldSchema<T>;
  result: boolean;
};

const testCaseData1: TestData<typeof MockObject1>[] = [
  {
    message: 'test empty compare field',
    compareField: {},
    result: true,
  },
  {
    message: 'test 1 layer compare field',
    compareField: {
      a: true,
    },
    result: true,
  },
  {
    message: 'test 1 layer compare field',
    compareField: {
      b: true,
    },
    result: false,
  },
  {
    message: 'test 2 layer compare field',
    compareField: {
      c: {
        d: true,
      },
    },
    result: true,
  },
  {
    message: 'test 2 layer compare field',
    compareField: {
      c: {
        e: true,
      },
    },
    result: false,
  },
  {
    message: 'test 3 layer compare field with array',
    compareField: {
      f: {
        a: true,
      },
    },
    result: true,
  },
  {
    message: 'test 3 layer compare field with array',
    compareField: {
      f: {
        b: true,
      },
    },
    result: false,
  },
];

const testCaseData2: TestData<typeof MockObject3>[] = [
  {
    message: 'array - test empty compare field',
    compareField: {},
    result: true,
  },
  {
    message: 'array - test 1 layer compare field',
    compareField: {
      a: true,
    },
    result: true,
  },
  {
    message: 'array - test 1 layer compare field',
    compareField: {
      b: true,
    },
    result: false,
  },
  {
    message: 'array - test 2 layer compare field',
    compareField: {
      c: {
        d: true,
      },
    },
    result: true,
  },
  {
    message: 'array - test 2 layer compare field',
    compareField: {
      c: {
        e: true,
      },
    },
    result: false,
  },
  {
    message: 'array - test 3 layer compare field with array',
    compareField: {
      f: {
        a: true,
      },
    },
    result: true,
  },
  {
    message: 'array - test 3 layer compare field with array',
    compareField: {
      f: {
        b: true,
      },
    },
    result: false,
  },
];

it.each(testCaseData1)('$message', testCase => {
  expect(compareField(MockObject1, MockObject2, testCase.compareField)).toBe(testCase.result);
});

it.each(testCaseData2)('$message', testCase => {
  expect(compareField(MockObject3, MockObject4, testCase.compareField)).toBe(testCase.result);
});
