import { ViewPropTypes as DeprecatedViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class Tab extends Component {
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

Tab.propTypes = {
  ...DeprecatedViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledTab = connectStyle('NativeBase.Tab', {}, mapPropsToStyleNames)(Tab);

export { StyledTab as Tab };
