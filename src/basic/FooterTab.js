import { ViewPropTypes as DeprecatedViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class FooterTab extends Component {
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

FooterTab.propTypes = {
  ...DeprecatedViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledFooterTab = connectStyle(
  'NativeBase.FooterTab',
  {},
  mapPropsToStyleNames
)(FooterTab);

export { StyledFooterTab as FooterTab };
