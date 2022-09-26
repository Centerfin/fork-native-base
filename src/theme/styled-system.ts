import get from 'lodash.get';
import { resolveValueWithBreakpoint } from '../hooks/useThemeProps/resolveValueWithBreakpoint';
import { hasValidBreakpointFormat, transparentize } from './tools';
// import type { ITheme } from '.';
// import type { UseResponsiveQueryParams } from '../utils/useResponsiveQuery';
import { isEmptyObj } from '../utils/isEmptyObj';

const isNumber = (n: any) => typeof n === 'number' && !isNaN(n);

export const getColor = (rawValue: any, scale: any, theme: any) => {
  const alphaMatched =
    typeof rawValue === 'string' ? rawValue?.match(/:alpha\.\d\d?\d?/) : false;

  if (alphaMatched) {
    const colorMatched = rawValue?.match(/^.*?(?=:alpha)/);
    const color = colorMatched ? colorMatched[0] : colorMatched;
    const alphaValue = alphaMatched[0].split('.')[1];
    const alphaFromToken = get(theme.opacity, alphaValue, alphaValue);
    const alpha = alphaFromToken ? parseFloat(alphaFromToken) : 1;
    const newColor = transparentize(color, alpha)(theme);
    return newColor;
  } else {
    return get(scale, rawValue, rawValue);
  }
};

// To handle negative margins
const getMargin = (n: any, scale: any) => {
  n = convertStringNumberToNumber('margin', n);
  if (!isNumber(n)) {
    return get(scale, n, n);
  }

  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = get(scale, absolute, absolute);
  if (!isNumber(value)) {
    return isNegative ? '-' + value : value;
  }
  return value * (isNegative ? -1 : 1);
};

export const layout = {
  width: {
    property: 'width',
    scale: 'sizes',
  },
  w: {
    property: 'width',
    scale: 'sizes',
  },
  height: {
    property: 'height',
    scale: 'sizes',
  },
  h: {
    property: 'height',
    scale: 'sizes',
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minW: {
    property: 'minWidth',
    scale: 'sizes',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes',
  },
  minH: {
    property: 'minHeight',
    scale: 'sizes',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxW: {
    property: 'maxWidth',
    scale: 'sizes',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  maxH: {
    property: 'maxHeight',
    scale: 'sizes',
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  boxSize: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  textAlign: true,
} as const;

export const flexbox = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flexDir: {
    property: 'flexDirection',
  },
  // item
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  justifySelf: true,
  alignSelf: true,
  order: true,
} as const;

export const position = {
  position: true,
  zIndex: {
    property: 'zIndex',
  },
  top: {
    property: 'top',
    scale: 'space',
  },
  right: {
    property: 'right',
    scale: 'space',
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
  },
  left: {
    property: 'left',
    scale: 'space',
  },
} as const;

export const color = {
  color: {
    property: 'color',
    scale: 'colors',
    transformer: getColor,
  },
  tintColor: {
    property: 'tintColor',
    scale: 'colors',
    transformer: getColor,
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
    transformer: getColor,
  },
  opacity: {
    property: 'opacity',
    scale: 'opacity',
  },
  bg: {
    property: 'backgroundColor',
    scale: 'colors',
    transformer: getColor,
  },
  bgColor: {
    property: 'backgroundColor',
    scale: 'colors',
    transformer: getColor,
  },
  background: {
    property: 'backgroundColor',
    scale: 'colors',
    transformer: getColor,
  },
  textDecorationColor: {
    property: 'textDecorationColor',
    scale: 'colors',
    transformer: getColor,
  },
} as const;

export const border = {
  borderWidth: {
    property: 'borderWidth',
    scale: 'borderWidths',
  },
  borderStyle: {
    property: 'borderStyle',
    scale: 'borderStyles',
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
    transformer: getColor,
  },
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii',
  },
  borderTop: {
    property: 'borderTop',
    scale: 'borders',
  },
  borderTopRadius: {
    properties: ['borderTopLeftRadius', 'borderTopRightRadius'],
    scale: 'radii',
  },
  borderLeftRadius: {
    properties: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    scale: 'radii',
  },
  borderRightRadius: {
    properties: ['borderTopRightRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },
  borderRight: {
    property: 'borderRight',
    scale: 'borders',
  },
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders',
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders',
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
  },
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'borderWidths',
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors',
    transformer: getColor,
  },
  borderTopStyle: {
    property: 'borderTopStyle',
    scale: 'borderStyles',
  },
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'borderWidths',
  },
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors',
    transformer: getColor,
  },
  borderBottomStyle: {
    property: 'borderBottomStyle',
    scale: 'borderStyles',
  },
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'borderWidths',
  },
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors',
    transformer: getColor,
  },
  borderLeftStyle: {
    property: 'borderLeftStyle',
    scale: 'borderStyles',
  },
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'borderWidths',
  },
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors',
    transformer: getColor,
  },
  borderRightStyle: {
    property: 'borderRightStyle',
    scale: 'borderStyles',
  },
  rounded: {
    property: 'borderRadius',
    scale: 'radii',
  },

  roundedTopLeft: {
    property: 'borderTopLeftRadius',
    scale: 'radii',
  },

  roundedTopRight: {
    property: 'borderTopRightRadius',
    scale: 'radii',
  },

  roundedBottomLeft: {
    property: 'borderBottomLeftRadius',
    scale: 'radii',
  },

  roundedBottomRight: {
    property: 'borderBottomRightRadius',
    scale: 'radii',
  },

  roundedTop: {
    properties: ['borderTopLeftRadius', 'borderTopRightRadius'],
    scale: 'radii',
  },
  borderBottomRadius: {
    properties: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },
  roundedBottom: {
    properties: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },

  roundedLeft: {
    properties: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    scale: 'radii',
  },

  roundedRight: {
    properties: ['borderTopRightRadius', 'borderBottomRightRadius'],
    scale: 'radii',
  },
} as const;

export const background = {
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
  backgroundAttachment: true,
  backgroundBlendMode: true,
  bgImage: {
    property: 'backgroundImage',
  },
  bgImg: {
    property: 'backgroundImage',
  },
  bgBlendMode: {
    property: 'backgroundBlendMode',
  },
  bgSize: {
    property: 'backgroundSize',
  },
  bgPosition: {
    property: 'backgroundPosition',
  },
  bgPos: {
    property: 'backgroundPosition',
  },
  bgRepeat: {
    property: 'backgroundRepeat',
  },
  bgAttachment: {
    property: 'backgroundAttachment',
  },
} as const;

export const space = {
  margin: {
    property: 'margin',
    scale: 'space',
    transformer: getMargin,
  },
  m: {
    property: 'margin',
    scale: 'space',
    transformer: getMargin,
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transformer: getMargin,
  },
  mt: {
    property: 'marginTop',
    scale: 'space',
    transformer: getMargin,
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transformer: getMargin,
  },
  mr: {
    property: 'marginRight',
    scale: 'space',
    transformer: getMargin,
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transformer: getMargin,
  },
  mb: {
    property: 'marginBottom',
    scale: 'space',
    transformer: getMargin,
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transformer: getMargin,
  },
  ml: {
    property: 'marginLeft',
    scale: 'space',
    transformer: getMargin,
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transformer: getMargin,
  },
  mx: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transformer: getMargin,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transformer: getMargin,
  },
  my: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transformer: getMargin,
  },

  padding: {
    property: 'padding',
    scale: 'space',
  },
  p: {
    property: 'padding',
    scale: 'space',
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
  },
  pt: {
    property: 'paddingTop',
    scale: 'space',
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
  },
  pr: {
    property: 'paddingRight',
    scale: 'space',
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
  },
  pb: {
    property: 'paddingBottom',
    scale: 'space',
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
  },
  pl: {
    property: 'paddingLeft',
    scale: 'space',
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  px: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
  py: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
  gap: {
    property: 'gap',
    scale: 'space',
  },
} as const;

export const typography = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts',
    transformer: (val: any, scale: any) => {
      let value: any;
      if (scale.hasOwnProperty(val)) {
        value = get(scale, val);
      } else {
        value = get(scale, val, val);
      }
      return value ? value.toString() : undefined;
    },
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights',
    transformer: (val: any, scale: any) => {
      return val ? get(scale, val, val).toString() : val;
    },
  },
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings',
  },
  textAlign: true,
  fontStyle: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  textDecoration: { property: 'textDecorationLine' },
  txtDecor: { property: 'textDecorationLine' },
  textDecorationLine: true,
} as const;

const extraProps = {
  outline: true,
  outlineWidth: true,
  outlineColor: true,
  outlineStyle: true,
  shadow: {
    scale: 'shadows',
  },
  cursor: true,
  overflow: true,
  userSelect: { property: 'userSelect' },
} as const;

export const propConfig = {
  ...color,
  ...space,
  ...layout,
  ...flexbox,
  ...border,
  ...position,
  ...typography,
  ...background,
  ...extraProps,
} as const;

// For backward compatibility with 3.0 of props like non token string numbers `<Box mt={"39"} />` => used to get applied as 39px. RN expects fontWeight to be string and crashes with numbers
// https://reactnative.dev/docs/text-style-props#fontweight
const convertStringNumberToNumber = (key: string, value: string) => {
  if (
    typeof value === 'string' &&
    key !== 'fontWeight' &&
    value &&
    !isNaN(Number(value))
  ) {
    return parseFloat(value);
  }

  return value;
};

const getRNKeyAndStyleValue = ({
  config,
  value,
  key,
  theme,
  styledSystemProps,
  currentBreakpoint,
  platform,
}: any) => {
  let style: any = {};
  if (config === true) {
    style = {
      ...style,
      [key]: convertStringNumberToNumber(key, value),
    };
  } else if (config) {
    //@ts-ignore
    const { property, scale, properties, transformer } = config;
    let val = value;
    // console.log('zzzz style system props', theme, scale, value, transformer);
    if (transformer) {
      val = transformer(val, theme[scale], theme, styledSystemProps.fontSize);
    } else {
      // If a token is not found in the theme
      val = get(theme[scale], value, value);
    }

    if (typeof val === 'string') {
      if (val.endsWith('px')) {
        val = parseFloat(val);
        //TODO: build-time
        // } else if (val.endsWith('em') && Platform.OS !== 'web') {
      } else if (val.endsWith('em') && platform !== 'web') {
        const fontSize = resolveValueWithBreakpoint(
          styledSystemProps.fontSize,
          theme.breakpoints,
          currentBreakpoint,
          key
        );
        val =
          parseFloat(val) *
          parseFloat(get(theme.fontSizes, fontSize, fontSize));
      }
    }

    val = convertStringNumberToNumber(key, val);

    if (properties) {
      //@ts-ignore
      properties.forEach((property) => {
        style = {
          ...style,
          [property]: val,
        };
      });
    } else if (property) {
      style = {
        ...style,
        [property]: val,
      };
    } else {
      style = {
        ...style,
        ...val,
      };
    }
  }

  return style;
};

export const getStyleAndFilteredProps = ({
  theme,
  currentBreakpoint,
  getResponsiveStyles,
  styledSystemProps,
  platform,
}: any) => {
  let styleFromProps: any = {};
  let restDefaultProps: any = {};
  const unResolvedProps: any = {};
  let dataSet: any = {};
  let responsiveStyles: null | Record<
    keyof typeof theme.breakpoints,
    Array<any>
  > = null;

  const orderedBreakPoints = Object.entries(
    //@ts-ignore
    theme.breakpoints as ITheme['breakpoints']
    //@ts-ignore
  ).sort((a, b) => a[1] - b[1]);

  for (const key in styledSystemProps) {
    const rawValue = styledSystemProps[key];

    const config = propConfig[key as keyof typeof propConfig];

    // TODO: refactor
    // Start: For edge cases
    if (
      !getResponsiveStyles &&
      hasValidBreakpointFormat(rawValue, theme.breakpoints)
    ) {
      unResolvedProps[key] = rawValue;
    }

    // TODO: refactor space prop for Stack Component
    // if (key === 'space') {
    //   unResolvedProps[key] = rawValue;
    // }
    // End: For edge cases

    if (hasValidBreakpointFormat(rawValue, theme.breakpoints)) {
      if (!responsiveStyles) responsiveStyles = {};

      const value = rawValue;
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          //@ts-ignore
          if (!responsiveStyles[orderedBreakPoints[i][0]]) {
            //@ts-ignore
            responsiveStyles[orderedBreakPoints[i][0]] = [];
          }
          const newStyle = getRNKeyAndStyleValue({
            config,
            value: v,
            key,
            styledSystemProps,
            theme,
            currentBreakpoint,
            platform,
          });

          if (!isEmptyObj(newStyle)) {
            //@ts-ignore
            responsiveStyles[orderedBreakPoints[i][0]].push(newStyle);
          }
        });
      } else {
        // console.log('hello 111222', key, value);
        for (const k in value) {
          const newStyle = getRNKeyAndStyleValue({
            config,
            value: value[k],
            key,
            styledSystemProps,
            theme,
            currentBreakpoint,
            platform,
          });
          if (!responsiveStyles[k]) {
            responsiveStyles[k] = [];
          }
          if (!isEmptyObj(newStyle)) {
            responsiveStyles[k].push(newStyle);
          }
        }
        // console.log('hello 111222', key, value, responsiveStyles);
      }
    } else {
      const value = rawValue;

      // if (styledSystemProps?.extraProp?.endsWith('Icon')) {
      //   console.log(styledSystemProps?.extraProp, 'hello flatten here22');
      // }

      //TODO: refactor
      if (
        key === 'size' ||
        (styledSystemProps?.extraProp?.endsWith('.Icon') && key === 'color')
      ) {
        restDefaultProps = {
          ...restDefaultProps,
          [key]: value,
        };
      } else {
        const newStyle = getRNKeyAndStyleValue({
          config,
          value,
          key,
          styledSystemProps,
          theme,
          currentBreakpoint,
          platform,
        });

        // TODO: refactor
        if (
          isEmptyObj(newStyle) &&
          !key.startsWith('_') &&
          key !== 'extraProp' &&
          key !== 'colorScheme' &&
          // key !== 'style' &&
          key !== 'variants' &&
          key !== 'sizes' &&
          key !== 'variant'
        ) {
          restDefaultProps = {
            ...restDefaultProps,
            [key]: value,
          };
        }

        styleFromProps = {
          ...styleFromProps,
          ...newStyle,
        };
      }
    }
  }

  if (responsiveStyles) {
    if (getResponsiveStyles) {
      const query: any = { query: [] };
      orderedBreakPoints.forEach((o) => {
        const key = o[0];
        if (key === 'base') {
          if (responsiveStyles) query.initial = responsiveStyles.base;
        } else {
          if (responsiveStyles)
            if (key in responsiveStyles) {
              if (responsiveStyles[key].length > 0) {
                query?.query?.push({
                  //@ts-ignore
                  minWidth: o[1],
                  style: responsiveStyles[key],
                });
              }
            }
        }
      });
      // console.log('hello responsive', orderedBreakPoints, responsiveStyles);

      const { dataSet: newDataSet, styleFromQuery } = getResponsiveStyles(
        query
      );
      dataSet = { ...dataSet, ...newDataSet };

      styleFromProps = { ...styleFromProps, ...styleFromQuery };

      //TODO: build-time
      // styleFromProps = { ...styleFromProps };
    } else {
    }
  }

  // if (process.env.NODE_ENV === 'development' && debug) {
  //   /* eslint-disable-next-line */
  //   console.log('style ', debug + ' :: ', {
  //     styleFromProps,
  //     style,
  //     styledSystemProps,
  //   });
  // }

  return {
    //TODO: build-time
    styleSheet: {}, //StyleSheet.create({ box: styleFromProps }),
    styleFromProps,
    restDefaultProps,
    dataSet,
    unResolvedProps,
  };
};

export type StyledPropConfig = typeof propConfig;
