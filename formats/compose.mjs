/**
 * Custom Style Dictionary formats for Kotlin / Jetpack Compose output.
 */

const PACKAGE = 'com.worldcoin.designsystem';

function hexToArgb(hex) {
  const h = hex.replace('#', '');
  return `0xFF${h.toUpperCase()}`;
}

function camelCase(path) {
  return path
    .map((p, i) => (i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
}

function pascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function fontWeightToCompose(weight) {
  const map = {
    325: 'FontWeight.Light',
    400: 'FontWeight.Normal',
    500: 'FontWeight.Medium',
    600: 'FontWeight.SemiBold',
    700: 'FontWeight.Bold',
  };
  return map[weight] || `FontWeight(${weight})`;
}

/**
 * compose/colorObject – Generates a Kotlin object with Color(...) constants.
 * Used for primitive palette colors, crypto colors, specialty colors, avatar colors.
 */
export const composeColorObject = {
  name: 'compose/colorObject',
  format: ({ dictionary, options }) => {
    const objectName = options.objectName || 'WdsColorPalette';
    const tokens = dictionary.allTokens.filter((t) => t.$type === 'color');

    const lines = tokens.map((token) => {
      const name = camelCase(token.path);
      const hex = token.$value || token.value;
      return `    val ${name} = Color(${hexToArgb(hex)})`;
    });

    return [
      `package ${PACKAGE}`,
      '',
      'import androidx.compose.ui.graphics.Color',
      '',
      `object ${objectName} {`,
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};

/**
 * compose/themeColors – Generates a Kotlin object for semantic theme colors
 * (light or dark). References resolved hex values directly.
 */
export const composeThemeColors = {
  name: 'compose/themeColors',
  format: ({ dictionary, options }) => {
    const objectName = options.objectName || 'LightColorTokens';
    const tokens = dictionary.allTokens.filter(
      (t) => t.$type === 'color' && t.path[0] === 'semantic',
    );

    const lines = tokens.map((token) => {
      const name = camelCase(token.path.slice(1)); // drop "semantic" prefix
      const hex = token.$value || token.value;
      return `    val ${name} = Color(${hexToArgb(hex)})`;
    });

    return [
      `package ${PACKAGE}`,
      '',
      'import androidx.compose.ui.graphics.Color',
      '',
      `object ${objectName} {`,
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};

/**
 * compose/typography – Generates a Kotlin object with TextStyle constants.
 */
export const composeTypography = {
  name: 'compose/typography',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.filter(
      (t) => t.$type === 'typography',
    );

    const lines = tokens.flatMap((token) => {
      const name = token.path[token.path.length - 1];
      const v = token.$value || token.value;
      const fontSize = v.fontSize;
      const lineHeight = (v.fontSize * v.lineHeightMultiplier).toFixed(1);
      const letterSpacing =
        v.letterSpacing !== 0
          ? `\n        letterSpacing = (${v.letterSpacing}).em,`
          : '';
      return [
        `    val ${name} = TextStyle(`,
        '        fontFamily = WorldProFontFamily,',
        `        fontWeight = ${fontWeightToCompose(v.fontWeight)},`,
        `        fontSize = ${fontSize}.sp,`,
        `        lineHeight = ${lineHeight}.sp,${letterSpacing}`,
        '    )',
        '',
      ];
    });

    return [
      `package ${PACKAGE}`,
      '',
      'import androidx.compose.ui.text.TextStyle',
      'import androidx.compose.ui.text.font.FontFamily',
      'import androidx.compose.ui.text.font.FontWeight',
      'import androidx.compose.ui.unit.em',
      'import androidx.compose.ui.unit.sp',
      '',
      '// Font family must be provided by the consuming app',
      'val WorldProFontFamily = FontFamily.Default',
      '',
      'object WdsTypography {',
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};

/**
 * compose/spacing – Generates a Kotlin object with Dp constants.
 */
export const composeSpacing = {
  name: 'compose/spacing',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.filter(
      (t) => t.$type === 'dimension' && t.path[0] === 'spacing',
    );

    const lines = tokens.map((token) => {
      const name = token.path[token.path.length - 1];
      const v = token.$value ?? token.value;
      return `    val ${name} = ${v}.dp`;
    });

    return [
      `package ${PACKAGE}`,
      '',
      'import androidx.compose.ui.unit.dp',
      'import androidx.compose.ui.unit.Dp',
      '',
      'object WdsSpacing {',
      ...lines,
      '}',
      '',
    ].join('\n');
  },
};