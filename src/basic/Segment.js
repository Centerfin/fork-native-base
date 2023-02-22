import { ViewPropTypes as DeprecatedViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class Segment extends Component {
  render() {
    return <View ref={c => (this._root = c)} {...this.props} />;
  }
}

Segment.propTypes = {
  ...DeprecatedViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledSegment = connectStyle(
  'NativeBase.Segment',
  {},
  mapPropsToStyleNames
)(Segment);
export { StyledSegment as Segment };
