import { RandomRangePipe } from './random-range.pipe';

describe('RandomRangePipe', () => {
  let pipe: RandomRangePipe;

  beforeEach(() => {
    pipe = new RandomRangePipe();
  });

  it('create an instance', () => {
    const pipe = new RandomRangePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a random number within the given range', () => {
    const min = 1;
    const max = 10;
    const result = pipe.transform(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
