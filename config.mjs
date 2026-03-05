import StyleDictionary from 'style-dictionary';
import { readFileSync, cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import {
  composeColorObject,
  composeThemeColors,
  composeTypography,
  composeSpacing,
} from './formats/compose.mjs';
import {
  swiftColorDefaults,
  swiftColorTheme,
  swiftFontDefaults,
  swiftSpacing,
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
  swiftColorDefaults,
  swiftColorTheme,
  swiftFontDefaults,
  swiftSpacing,
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
];

// ---------------------------------------------------------------------------
// Output paths
// ---------------------------------------------------------------------------
const androidOut =
  'build/android/src/main/kotlin/com/worldcoin/designsystem';
const iosOut = 'build/ios/Sources/WorldDesignSystem';

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
                  destination: 'WdsColorPalette.kt',
                  format: 'compose/colorObject',
                  options: { objectName: 'WdsColorPalette' },
                  filter: (token) =>
                    token.$type === 'color' && token.path[0] === 'color',
                },
                {
                  destination: 'WdsTypography.kt',
                  format: 'compose/typography',
                  filter: (token) => token.$type === 'typography',
                },
                {
                  destination: 'WdsSpacing.kt',
                  format: 'compose/spacing',
                  filter: (token) =>
                    token.$type === 'dimension' &&
                    token.path[0] === 'spacing',
                },
              ]
            : [],
      },
      'android-semantic': {
        buildPath: `${androidOut}/`,
        files: [
          {
            destination: `Wds${themeLabel}ColorTokens.kt`,
            format: 'compose/themeColors',
            options: { objectName: `Wds${themeLabel}ColorTokens` },
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
                  destination: 'WdsColorPalette.swift',
                  format: 'swift/wldColorDefaults',
                  filter: (token) =>
                    token.$type === 'color' && token.path[0] === 'color',
                },
                {
                  destination: 'WdsTypography.swift',
                  format: 'swift/wldFontDefaults',
                  filter: (token) => token.$type === 'typography',
                },
                {
                  destination: 'WdsSpacing.swift',
                  format: 'swift/spacing',
                  filter: (token) =>
                    token.$type === 'dimension' &&
                    token.path[0] === 'spacing',
                },
              ]
            : [],
      },
      'ios-semantic': {
        buildPath: `${iosOut}/`,
        files: [
          {
            destination: `Wds${themeLabel}ColorTokens.swift`,
            format: 'swift/wldColorTheme',
            options: { structName: `Wds${themeLabel}ColorTokens` },
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
      from: 'templates/android/src/main/kotlin/com/worldcoin/designsystem/WdsTheme.kt',
      to: `${androidOut}/WdsTheme.kt`,
    },
    // iOS
    {
      from: 'templates/ios/Package.swift',
      to: 'build/ios/Package.swift',
    },
    {
      from: 'templates/ios/Sources/WorldDesignSystem/WdsTheme.swift',
      to: `${iosOut}/WdsTheme.swift`,
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
