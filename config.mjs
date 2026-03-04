import StyleDictionary from 'style-dictionary';
import { readFileSync, cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import {
  composeColorObject,
  composeThemeColors,
  composeTypography,
  composeSpacing,
  composeComponents,
} from './formats/compose.mjs';
import {
  swiftColorDefaults,
  swiftColorTheme,
  swiftFontDefaults,
  swiftSpacing,
  swiftComponents,
} from './formats/swift.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Register all custom formats
// ---------------------------------------------------------------------------
const allFormats = [
  composeColorObject,
  composeThemeColors,
  composeTypography,
  composeSpacing,
  composeComponents,
  swiftColorDefaults,
  swiftColorTheme,
  swiftFontDefaults,
  swiftSpacing,
  swiftComponents,
];

// ---------------------------------------------------------------------------
// Token source paths (primitives + components – shared across themes)
// ---------------------------------------------------------------------------
const primitiveSources = [
  'tokens/color/base.json',
  'tokens/color/specialty.json',
  'tokens/color/crypto.json',
  'tokens/color/avatar.json',
  'tokens/typography/scale.json',
  'tokens/spacing/spacing.json',
  'tokens/component/border-radius.json',
  'tokens/component/button.json',
  'tokens/component/shadow.json',
];

// ---------------------------------------------------------------------------
// Output paths
// ---------------------------------------------------------------------------
const androidOut =
  'build/android/src/main/kotlin/com/worldcoin/designsystem';
const iosOut = 'Sources/WorldDesignSystem';

// ---------------------------------------------------------------------------
// Helper: build one theme pass
// ---------------------------------------------------------------------------
async function buildTheme(theme) {
  const semanticFile =
    theme === 'light' ? 'tokens/semantic/light.json' : 'tokens/semantic/dark.json';
  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  const sd = new StyleDictionary({
    source: [...primitiveSources, semanticFile],
    platforms: {
      // ── Android / Compose ──────────────────────────────
      'android-primitives': {
        buildPath: `${androidOut}/`,
        files:
          theme === 'light'
            ? [
                {
                  destination: 'WDSColorPalette.kt',
                  format: 'compose/colorObject',
                  options: { objectName: 'WDSColorPalette' },
                  filter: (token) =>
                    token.$type === 'color' && token.path[0] === 'color',
                },
                {
                  destination: 'WDSTypography.kt',
                  format: 'compose/typography',
                  filter: (token) => token.$type === 'typography',
                },
                {
                  destination: 'WDSSpacing.kt',
                  format: 'compose/spacing',
                  filter: (token) =>
                    token.$type === 'dimension' &&
                    token.path[0] === 'spacing',
                },
                {
                  destination: 'WDSComponents.kt',
                  format: 'compose/components',
                  filter: (token) => token.path[0] === 'component',
                },
              ]
            : [],
      },
      'android-semantic': {
        buildPath: `${androidOut}/`,
        files: [
          {
            destination: `${themeLabel}ColorTokens.kt`,
            format: 'compose/themeColors',
            options: { objectName: `${themeLabel}ColorTokens` },
            filter: (token) =>
              token.$type === 'color' && token.path[0] === 'semantic',
          },
        ],
      },

      // ── iOS / Swift ────────────────────────────────────
      'ios-primitives': {
        buildPath: `${iosOut}/`,
        files:
          theme === 'light'
            ? [
                {
                  destination: 'ColorPalette.swift',
                  format: 'swift/wldColorDefaults',
                  filter: (token) =>
                    token.$type === 'color' && token.path[0] === 'color',
                },
                {
                  destination: 'TypographyTokens.swift',
                  format: 'swift/wldFontDefaults',
                  filter: (token) => token.$type === 'typography',
                },
                {
                  destination: 'SpacingTokens.swift',
                  format: 'swift/spacing',
                  filter: (token) =>
                    token.$type === 'dimension' &&
                    token.path[0] === 'spacing',
                },
                {
                  destination: 'ComponentTokens.swift',
                  format: 'swift/components',
                  filter: (token) => token.path[0] === 'component',
                },
              ]
            : [],
      },
      'ios-semantic': {
        buildPath: `${iosOut}/`,
        files: [
          {
            destination: `${themeLabel}Theme.swift`,
            format: 'swift/wldColorTheme',
            options: { structName: `${themeLabel}Theme` },
            filter: (token) =>
              token.$type === 'color' && token.path[0] === 'semantic',
          },
        ],
      },
    },
  });

  // Register custom formats
  for (const fmt of allFormats) {
    sd.registerFormat(fmt);
  }

  await sd.buildAllPlatforms();
  console.log(`✓ ${themeLabel} theme built`);
}

// ---------------------------------------------------------------------------
// Copy static template files into build/
// ---------------------------------------------------------------------------
function copyTemplates() {
  const copies = [
    // Android
    {
      from: 'templates/android/build.gradle.kts',
      to: 'build/android/build.gradle.kts',
    },
    {
      from: 'templates/android/settings.gradle.kts',
      to: 'build/android/settings.gradle.kts',
    },
    {
      from: 'templates/android/src/main/kotlin/com/worldcoin/designsystem/WDSTheme.kt',
      to: `${androidOut}/WDSTheme.kt`,
    },
    // iOS
    {
      from: 'templates/ios/Package.swift',
      to: 'Package.swift',
    },
    {
      from: 'templates/ios/Sources/WorldDesignSystem/WDSTheme.swift',
      to: `${iosOut}/WDSTheme.swift`,
    },
  ];

  for (const { from, to } of copies) {
    const src = resolve(__dirname, from);
    const dest = resolve(__dirname, to);
    if (!existsSync(src)) {
      console.warn(`  ⚠ template not found: ${from}`);
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
  }
  console.log('✓ Templates copied');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Building World Design System tokens…\n');
  await buildTheme('light');
  await buildTheme('dark');
  copyTemplates();
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
