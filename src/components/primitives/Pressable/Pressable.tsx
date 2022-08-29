import React, { forwardRef, memo } from 'react';
import { Pressable as RNPressable } from 'react-native';
import { composeEventHandlers } from '../../../utils';
import type { IPressableProps } from './types';
import { makeStyledComponent } from '../../../utils/makeStyledComponent';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useFocusRing } from '@react-native-aria/focus';

const StyledPressable = makeStyledComponent(RNPressable);

// updateComponentThemeMap('Pressable');

export const useHover = () => {
  const [isHovered, setHovered] = React.useState(false);
  return {
    hoverProps: {
      onHoverIn: () => setHovered(true),
      onHoverOut: () => setHovered(false),
    },
    isHovered,
  };
};

export const useFocus = () => {
  const [isFocused, setFocused] = React.useState(false);
  return {
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
    isFocused,
  };
};

export const useIsPressed = () => {
  const [isPressed, setIsPressed] = React.useState(false);
  return {
    pressableProps: {
      onPressIn: () => setIsPressed(true),
      onPressOut: () => setIsPressed(false),
    },
    isPressed,
  };
};

const Pressable = (
  {
    children,
    isDisabled,
    disabled,
    isHovered: isHoveredProp,
    isPressed: isPressedProp,
    isFocused: isFocusedProp,
    isFocusVisible: isFocusVisibleProp,
    // style: pressableStyle,
    ...props
  }: IPressableProps,
  ref: any
) => {
  const { hoverProps, isHovered } = useHover();
  const { pressableProps, isPressed } = useIsPressed();
  const { focusProps, isFocused } = useFocus();
  const { isFocusVisible, focusProps: focusRingProps }: any = useFocusRing();
  const state = {
    isPressed: isPressedProp || isPressed,
    isFocused: isFocusedProp || isFocused,
    isHovered: isHoveredProp || isHovered,
    isFocusVisible: isFocusVisibleProp || isFocusVisible,
    isDisabled: disabled || isDisabled,
  };

  // console.log(style, 'hello style');

  const {
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = usePropsResolution('Pressable', props, state);

  // TODO: Replace Render props with Context Hook

  // console.log(resolvedProps, 'hello 111 &&&');

  // TODO: Replace Render props with Context Hook

  // console.log(
  //   props.stateProps,
  //   resolvedProps.stateProps,
  //   'hello state props h3233'
  // );

  return (
    <StyledPressable
      // style={[, pressableStyle]}
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
      disabled={disabled || isDisabled}
      {...resolvedProps}
    >
      {typeof children !== 'function'
        ? children
        : children({
            isPressed,
            isHovered,
            isFocused,
          })}
    </StyledPressable>
  );
};

export default memo(forwardRef(Pressable));
