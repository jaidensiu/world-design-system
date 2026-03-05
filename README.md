# World Design System – Design Tokens

Cross-platform design tokens for the World App, built with [Style Dictionary](https://github.com/style-dictionary/style-dictionary).

## Architecture

**Two-layer token system:**

1. **Primitive tokens** – Raw palette values (grey, error, warning, success, info, specialty, crypto, avatar). Theme-agnostic.
2. **Semantic tokens** – Role-based references (`background.primary`, `text.primary`, `action.primary`). Resolve differently per light/dark theme.

**Platform outputs are standalone** – no dependency on app-specific types. Android gets Compose `Color` objects; iOS gets raw hex `String` constants and a `WdsFontSpec` struct. The consuming app bridges these to its own types (e.g. `WLDColor`, `WLDFont`).

## Quick Start

```bash
npm install
npm run build
```

Generated files appear in `build/`:

| Platform | Path | Contents |
|----------|------|----------|
| Android  | `build/android/` | Kotlin objects with Compose `Color` values, `build.gradle.kts` for Maven publishing |
| iOS      | `build/ios/` | Standalone Swift enums/structs with hex string constants, `Package.swift` for SPM |

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

## Generated Output

### Android (Kotlin/Compose)

- `WdsColorPalette` – Primitive colors as `Color` objects
- `WdsLightColorTokens` / `WdsDarkColorTokens` – Semantic theme colors
- `WdsTypography` – Type scale as `TextStyle` values
- `WdsSpacing` – Spacing scale as `Dp` values
- `WdsTheme` – Composable theme provider with `Wds.colors` accessor

### iOS (Swift)

- `WdsColorPalette` – Primitive colors as hex `String` constants
- `WdsLightColorTokens` / `WdsDarkColorTokens` – Semantic theme colors as hex strings
- `WdsTypography` – Type scale as `WdsFontSpec` values
- `WdsSpacing` – Spacing scale as `CGFloat` values
- `WdsTheme` – Light/dark `WdsSemanticColors` bundles

## CI/CD

The GitHub Actions workflow (`.github/workflows/publish.yml`) supports two trigger modes:

- **Merged PR with a release label** (`major`, `minor`, `patch`) – auto-bumps version, creates a tag, builds, and publishes
- **Manual dispatch** – choose the bump type from the Actions UI

### Pipeline Steps

1. **release** – Determines version bump, creates and pushes a `v*` tag
2. **build** – Runs `npm run build`, uploads `android-tokens` and `ios-tokens` artifacts
3. **publish-maven** – Publishes Android library to GitHub Packages
4. **publish-spm** – Commits generated iOS files to the `generated/ios` branch, tags as `v*-ios`

## Consuming the Tokens

### Android

Add the GitHub Packages Maven repository to `settings.gradle`:

```groovy
maven {
    url = uri("https://maven.pkg.github.com/jaidensiu/world-design-system")
    credentials {
        username = System.getenv("GITHUB_USER")
        password = System.getenv("GITHUB_TOKEN")
    }
}
```

Then add the dependency:

```groovy
implementation "com.worldcoin:design-system:<version>"
```

Wrap your composable tree in `WdsTheme { ... }` and access tokens via `Wds.colors`, `WdsTypography`, `WdsSpacing`, etc.

### iOS

Add the SPM dependency in your `Package.swift`:

```swift
.package(url: "https://github.com/jaidensiu/world-design-system.git", branch: "generated/ios")
```

Or pin to a specific release tag (e.g. `v0.1.0-ios`).

Then add `WorldDesignSystem` as a dependency on your target:

```swift
.target(
    name: "YourTarget",
    dependencies: [
        .product(name: "WorldDesignSystem", package: "world-design-system"),
    ]
)
```

Bridge the standalone tokens to your app types:

```swift
import WorldDesignSystem

// Colors – WdsColorPalette contains hex strings
let color = WLDColor(WdsColorPalette.colorGrey900)

// Typography – WdsTypography contains WdsFontSpec values
let spec = WdsTypography.h1
let font = WLDFont(size: spec.size, weight: Weight(integerLiteral: Int(spec.weight)), ...)

// Semantic themes
let lightBg = WdsTheme.light.backgroundPrimary  // hex String
```

## Adding / Modifying Tokens

1. Edit the relevant JSON file in `tokens/`
2. Run `npm run build` to verify output
3. Open a PR with a release label (`patch`, `minor`, or `major`)
4. On merge, CI auto-tags and publishes to both platforms
