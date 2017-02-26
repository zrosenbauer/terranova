import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Inner from '../Inner';

describe('Inner', () => {
  const defaultProps = {
    id: 'id',
    options: {
      zoom: 13,
      center: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
    features: [],
    featureTypes: {},
    setStyles: [],
  };

  const wrapper = shallow(<Inner {...defaultProps} />);

  beforeEach(() => {
    wrapper.setProps(defaultProps);
  });

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});