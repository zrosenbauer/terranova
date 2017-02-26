import index from '../index';

describe('index', () => {
  it('matches snapshot', () => {
    expect(index).toMatchSnapshot();
  });
});
