import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InfoWindow from '../InfoWindow';

jest.unmock('../InfoWindow');

describe('InfoWindow', () => {
  const defaultProps = {};

  const wrapper = shallow(<InfoWindow {...defaultProps} />);

  beforeEach(() => {
    wrapper.setProps(defaultProps);
  });

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('updates styles via props', () => {
    const newStyles = {
      display: 'none',
    };
    const innerWrapper = shallow(
      <InfoWindow
        style={newStyles}
      />
    );
    expect(innerWrapper.instance().style).toEqual({
      ...newStyles,
      ...wrapper.instance().style,
    });
  });

  it('updates variations via props', () => {
    const newVariations = {
      variA: 'A',
    };
    const innerWrapper = shallow(
      <InfoWindow
        variations={newVariations}
      />
    );
    expect(innerWrapper.instance().variations).toEqual({
      ...newVariations,
      ...wrapper.instance().variations,
    });
  });

  it('selects InfoWindow based on feature', () => {
    const DummyComponent = () => (
      <div className="my-fake-iw" />
    );
    const variations = {
      pickMe: DummyComponent,
    };
    const feature = {
      type: 'pickMe',
      forEachProperty: () => {},
      getProperty: () => 'pickMe',
    };
    const innerWrapper = shallow(
      <InfoWindow
        feature={feature}
        variations={variations}
      />
    );
    expect(innerWrapper.first('DummyComponent')).not.toBe(undefined);
    expect(innerWrapper.first('DummyComponent')).not.toBe(null);
  });
});