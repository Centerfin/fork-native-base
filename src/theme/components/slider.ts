export const SliderTrack = {
  baseStyle: () => {
    return {
      bg: 'muted.200',
      borderRadius: 'lg',
      overflow: 'hidden',
      _pressable: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      _dark: {
        bg: 'muted.700',
      },
    };
  },

  variants: {
    horizontal: {
      px: '3',
      width: '100%',
      height: 1,
      _pressable: {
        width: '100%',
      },
    },
    vertical: {
      py: '3',
      height: '100%',
      width: 1,
      _pressable: {
        height: '100%',
      },
    },
  },
};

export const SliderThumb = {
  baseStyle: (props: any) => {
    const { colorScheme } = props;
    const colors = props.theme.colors;
    return {
      borderRadius: 'full',
      zIndex: 999,
      alignItems: 'center',
      justifyContent: 'center',
      scaleOnPressed: 1,
      _interactionBox: {
        position: 'absolute',
        borderRadius: 'full',
        zIndex: -1,
      },
      _stack: {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // space: 2,
      },
      bg: `${colorScheme}.600`,
      _hover: {
        _web: {
          outlineWidth: '4px',
          outlineColor: colors[colorScheme][300],
          outlineStyle: 'solid',
        },
      },
      _focus: {
        _web: {
          outlineWidth: '2px',
          outlineColor: colors.primary[400],
          outlineStyle: 'solid',
        },
      },
      _pressed: {
        _interactionBox: {
          borderWidth: '8',
          borderColor: `${colorScheme}.300`,
        },
      },
      _dark: {
        bg: `${colorScheme}.500`,
        _hover: {
          _web: {
            outlineWidth: '4px',
            outlineColor: colors[colorScheme][800],
            outlineStyle: 'solid',
          },
        },
        _focus: {
          _web: {
            outlineWidth: '2px',
            outlineColor: colors.primary[400],
            outlineStyle: 'solid',
          },
        },
        _pressed: {
          _interactionBox: {
            borderWidth: '8',
            borderColor: `${colorScheme}.800`,
          },
        },
      },
      // shadow: 6,
      _web: {
        cursor: 'pointer',
      },
    };
  },
  defaultProps: {
    colorScheme: 'primary',
    // size: 'md',
  },
  sizes: {
    lg: {
      _interactionBox: '3',
    },
    md: {
      _interactionBox: '2',
    },
    sm: {
      _interactionBox: '2.5',
    },
  },
};

export const SliderFilledTrack = {
  baseStyle: ({ colorScheme }: any) => {
    return {
      bg: `${colorScheme}.600`,

      _dark: {
        bg: `${colorScheme}.500`,
      },
    };
  },
  defaultProps: {
    colorScheme: 'primary',
  },

  variants: {
    vertical: {
      // height: '100%',
      bottom: 0,
      _reversed: {
        top: 0,
        bottom: undefined,
      },
    },
    horizontal: {
      // height: `4px`,
      left: 0,
      _reversed: {
        right: 0,
        left: undefined,
      },
    },
  },
};

const sliderSizes = {
  lg: { thumbSize: 6, sliderTrackHeight: 6, _interactionBox: { p: '3' } },
  md: { thumbSize: 5, sliderTrackHeight: 5, _interactionBox: { p: '2.5' } },
  sm: { thumbSize: 4, sliderTrackHeight: 4, _interactionBox: { p: '2' } },
};

const variants = {
  vertical: {
    height: '100%',
  },
  horizontal: {
    width: '100%',
  },
};

export const Slider = {
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    _disabled: {
      opacity: 0.4,
      _web: {
        cursor: 'not-allowed',
      },
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'horizontal',
    colorScheme: 'primary',
  },
  sizes: sliderSizes,
  variants,
};
