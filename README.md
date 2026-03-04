# World Design System – Design Tokens

Cross-platform design tokens for the World App, built with [Style Dictionary](https://github.com/style-dictionary/style-dictionary).

## Architecture

**Two-layer token system:**

1. **Primitive tokens** – Raw palette values (grey, error, warning, success, info, specialty, crypto, avatar). Theme-agnostic.
2. **Semantic tokens** – Role-based references (`background.primary`, `text.primary`, `action.primary`). Resolve differently per light/dark theme.

## Quick Start

```bash
npm install
npm run build
```

Generated files appear in `build/`:

| Platform | Path | Contents |
|----------|------|----------|
| Android  | `build/android/` | Kotlin objects with Compose `Color` values, `build.gradle.kts` for Maven publishing |
| iOS      | `build/ios/` | Swift extensions matching `WLDColor`/`WLDFont` patterns, `Package.swift` for SPM |

## Token Files

| File | Description |
|------|-------------|
| `tokens/color/base.json` | Grey, error, warning, success, info palettes |
| `tokens/color/specialty.json` | Brand colors (worldBlue, carrotOrange, purple, etc.) |
| `tokens/color/crypto.json` | Crypto token colors (WLD, USDC, BTC, ETH) |
| `tokens/color/avatar.json` | 10 avatar foreground/background pairs |
| `tokens/semantic/light.json` | Semantic-to-primitive mappings for light theme |
| `tokens/semantic/dark.json` | Semantic-to-primitive mappings for dark theme |
| `tokens/typography/scale.json` | Full type scale (d1, n1-5, h1-4, s1-4, l1-3, b1-4) |
| `tokens/spacing/spacing.json` | Spacing scale (xxs through xxl) |
| `tokens/component/border-radius.json` | Border radius tokens |
| `tokens/component/button.json` | Button size tokens |
| `tokens/component/shadow.json` | Shadow definitions |

## CI/CD

The GitHub Actions workflow (`.github/workflows/build-and-publish.yml`) runs on:

- **PRs** – validates the build
- **Push to main** – builds and uploads artifacts
- **Tags (`v*`)** – publishes Maven package (Android) and SPM package (iOS)

### Android Consumption

Add to `settings.gradle`:
```kotlin
maven {
    url = uri("https://maven.pkg.github.com/worldcoin/world-design-system")
    credentials {
        username = System.getenv("GITHUB_USER")
        password = System.getenv("GITHUB_TOKEN")
    }
}
```

Then in `build.gradle.kts`:
```kotlin
implementation("com.worldcoin:design-system:<version>")
```

### iOS Consumption

Add the SPM dependency pointing to the `generated/ios` branch or a specific `v*-ios` tag.

## Adding / Modifying Tokens

1. Edit the relevant JSON file in `tokens/`
2. Run `npm run build` to verify output
3. Open a PR – CI will validate the build
4. On merge + tag, CI publishes to both platforms
