import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Outer from '../Outer';

describe('Outer', () => {
  const defaultProps = {
    children: null,
    height: '100px',
    width: '100px',
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

  const wrapper = shallow(<Outer {...defaultProps} />);

  beforeEach(() => {
    wrapper.setProps(defaultProps);
  });

  it('matches snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('sets styles from props', () => {
    const style = {
      position: 'relative',
      height: defaultProps.height,
      width: defaultProps.width,
    };
    expect(wrapper.find('.terra-outer').prop('style')).toEqual(style);

    const nextProps = {
      height: '0px',
      width: '0px',
    };
    wrapper.setProps(nextProps);
    expect(wrapper.find('.terra-outer').prop('style')).toEqual({
      ...style,
      height: nextProps.height,
      width: nextProps.width,
    });
  });
});