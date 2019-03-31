import { CheckEqualityPipe } from './check-equality.pipe';

describe('CheckEqualityPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckEqualityPipe();
    expect(pipe).toBeTruthy();
  });
});
