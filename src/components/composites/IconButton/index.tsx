import React, { memo, forwardRef } from 'react';
import { Pressable } from '../../primitives/Pressable';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { composeEventHandlers } from '../../../utils';
import type { IIconButtonProps } from './types';
import {
  useHover,
  useFocus,
  useIsPressed,
} from '../../primitives/Pressable/Pressable';
import { useFocusRing } from '@react-native-aria/focus';
import { Icon } from '../../primitives/Icon';
import merge from 'lodash.merge';

const IconButton = (
  {
    icon,
    _icon: pseudoIconProp,
    children,
    isHovered: isHoveredProp,
    isPressed: isPressedProp,
    isFocused: isFocusedProp,
    isFocusVisible: isFocusVisibleProp,
    isDisabled,
    ...props
  }: IIconButtonProps,
  ref: any
) => {
  const { hoverProps, isHovered } = useHover();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const { isFocusVisible, focusProps: focusRingProps }: any = useFocusRing();

  const state = {
    isHovered: isHoveredProp || isHovered,
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled,
  };

  const {
    _icon,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution(
    'IconButton',
    { ...props, _icon: merge({}, pseudoIconProp, icon?.props) },
    state
  );

  let clonedIcon;

  if (icon) {
    clonedIcon = React.cloneElement(icon, {
      ..._icon,
    });
  }

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      ref={ref}
      onPressIn={composeEventHandlers(onPressIn, pressableProps.onPressIn)}
      onPressOut={composeEventHandlers(onPressOut, pressableProps.onPressOut)}
      // @ts-ignore - web only
      onHoverIn={composeEventHandlers(onHoverIn, hoverProps.onHoverIn)}
      // @ts-ignore - web only
      onHoverOut={composeEventHandlers(onHoverOut, hoverProps.onHoverOut)}
      // @ts-ignore - web only
      onFocus={composeEventHandlers(
        composeEventHandlers(onFocus, focusProps.onFocus),
        focusRingProps.onFocus
      )}
      // @ts-ignore - web only
      onBlur={composeEventHandlers(
        composeEventHandlers(onBlur, focusProps.onBlur),
        focusRingProps.onBlur
      )}
      {...resolvedProps}
    >
      {clonedIcon || <Icon {..._icon}>{children}</Icon>}
    </Pressable>
  );
};

export default memo(forwardRef(IconButton));
export type { IIconButtonProps };
