import { ViewPropTypes as DeprecatedViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class ViewNB extends Component {
  render() {
    return <View ref={c => (this._root = c)} {...this.props} />;
  }
}

ViewNB.propTypes = {
  ...DeprecatedViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledViewNB = connectStyle(
  'NativeBase.ViewNB',
  {},
  mapPropsToStyleNames
)(ViewNB);
export { StyledViewNB as ViewNB };