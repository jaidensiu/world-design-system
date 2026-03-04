import Foundation

/// Semantic color set for the World Design System.
public struct WDSSemanticColors {
    // Background
    public let backgroundPrimary: WLDColor
    public let backgroundSecondary: WLDColor
    public let backgroundTertiary: WLDColor
    // Text
    public let textPrimary: WLDColor
    public let textSecondary: WLDColor
    public let textTertiary: WLDColor
    public let textInverse: WLDColor
    // Border
    public let borderDefault: WLDColor
    public let borderStrong: WLDColor
    // Action
    public let actionPrimary: WLDColor
    public let actionPrimaryContent: WLDColor
    public let actionSecondary: WLDColor
    public let actionDisabled: WLDColor
    public let actionDisabledContent: WLDColor
    // Status
    public let statusError: WLDColor
    public let statusWarning: WLDColor
    public let statusSuccess: WLDColor
    public let statusInfo: WLDColor
    // Tab Bar
    public let tabBarSelected: WLDColor
    public let tabBarUnselected: WLDColor
    public let tabBarBackground: WLDColor
    public let tabBarBorder: WLDColor
}

public enum WDSTheme {
    public static let light = WDSSemanticColors(
        backgroundPrimary: LightTheme.backgroundPrimary,
        backgroundSecondary: LightTheme.backgroundSecondary,
        backgroundTertiary: LightTheme.backgroundTertiary,
        textPrimary: LightTheme.textPrimary,
        textSecondary: LightTheme.textSecondary,
        textTertiary: LightTheme.textTertiary,
        textInverse: LightTheme.textInverse,
        borderDefault: LightTheme.borderDefault,
        borderStrong: LightTheme.borderStrong,
        actionPrimary: LightTheme.actionPrimary,
        actionPrimaryContent: LightTheme.actionPrimaryContent,
        actionSecondary: LightTheme.actionSecondary,
        actionDisabled: LightTheme.actionDisabled,
        actionDisabledContent: LightTheme.actionDisabledContent,
        statusError: LightTheme.statusError,
        statusWarning: LightTheme.statusWarning,
        statusSuccess: LightTheme.statusSuccess,
        statusInfo: LightTheme.statusInfo,
        tabBarSelected: LightTheme.tabBarSelected,
        tabBarUnselected: LightTheme.tabBarUnselected,
        tabBarBackground: LightTheme.tabBarBackground,
        tabBarBorder: LightTheme.tabBarBorder
    )

    public static let dark = WDSSemanticColors(
        backgroundPrimary: DarkTheme.backgroundPrimary,
        backgroundSecondary: DarkTheme.backgroundSecondary,
        backgroundTertiary: DarkTheme.backgroundTertiary,
        textPrimary: DarkTheme.textPrimary,
        textSecondary: DarkTheme.textSecondary,
        textTertiary: DarkTheme.textTertiary,
        textInverse: DarkTheme.textInverse,
        borderDefault: DarkTheme.borderDefault,
        borderStrong: DarkTheme.borderStrong,
        actionPrimary: DarkTheme.actionPrimary,
        actionPrimaryContent: DarkTheme.actionPrimaryContent,
        actionSecondary: DarkTheme.actionSecondary,
        actionDisabled: DarkTheme.actionDisabled,
        actionDisabledContent: DarkTheme.actionDisabledContent,
        statusError: DarkTheme.statusError,
        statusWarning: DarkTheme.statusWarning,
        statusSuccess: DarkTheme.statusSuccess,
        statusInfo: DarkTheme.statusInfo,
        tabBarSelected: DarkTheme.tabBarSelected,
        tabBarUnselected: DarkTheme.tabBarUnselected,
        tabBarBackground: DarkTheme.tabBarBackground,
        tabBarBorder: DarkTheme.tabBarBorder
    )

    /// Adaptive colors using `WLDColor(light:dark:)` – resolves at runtime
    /// based on the user's current interface style.
    public static let adaptive = WDSSemanticColors(
        backgroundPrimary: WLDColor(light: LightTheme.backgroundPrimary.hex, dark: DarkTheme.backgroundPrimary.hex),
        backgroundSecondary: WLDColor(light: LightTheme.backgroundSecondary.hex, dark: DarkTheme.backgroundSecondary.hex),
        backgroundTertiary: WLDColor(light: LightTheme.backgroundTertiary.hex, dark: DarkTheme.backgroundTertiary.hex),
        textPrimary: WLDColor(light: LightTheme.textPrimary.hex, dark: DarkTheme.textPrimary.hex),
        textSecondary: WLDColor(light: LightTheme.textSecondary.hex, dark: DarkTheme.textSecondary.hex),
        textTertiary: WLDColor(light: LightTheme.textTertiary.hex, dark: DarkTheme.textTertiary.hex),
        textInverse: WLDColor(light: LightTheme.textInverse.hex, dark: DarkTheme.textInverse.hex),
        borderDefault: WLDColor(light: LightTheme.borderDefault.hex, dark: DarkTheme.borderDefault.hex),
        borderStrong: WLDColor(light: LightTheme.borderStrong.hex, dark: DarkTheme.borderStrong.hex),
        actionPrimary: WLDColor(light: LightTheme.actionPrimary.hex, dark: DarkTheme.actionPrimary.hex),
        actionPrimaryContent: WLDColor(light: LightTheme.actionPrimaryContent.hex, dark: DarkTheme.actionPrimaryContent.hex),
        actionSecondary: WLDColor(light: LightTheme.actionSecondary.hex, dark: DarkTheme.actionSecondary.hex),
        actionDisabled: WLDColor(light: LightTheme.actionDisabled.hex, dark: DarkTheme.actionDisabled.hex),
        actionDisabledContent: WLDColor(light: LightTheme.actionDisabledContent.hex, dark: DarkTheme.actionDisabledContent.hex),
        statusError: WLDColor(light: LightTheme.statusError.hex, dark: DarkTheme.statusError.hex),
        statusWarning: WLDColor(light: LightTheme.statusWarning.hex, dark: DarkTheme.statusWarning.hex),
        statusSuccess: WLDColor(light: LightTheme.statusSuccess.hex, dark: DarkTheme.statusSuccess.hex),
        statusInfo: WLDColor(light: LightTheme.statusInfo.hex, dark: DarkTheme.statusInfo.hex),
        tabBarSelected: WLDColor(light: LightTheme.tabBarSelected.hex, dark: DarkTheme.tabBarSelected.hex),
        tabBarUnselected: WLDColor(light: LightTheme.tabBarUnselected.hex, dark: DarkTheme.tabBarUnselected.hex),
        tabBarBackground: WLDColor(light: LightTheme.tabBarBackground.hex, dark: DarkTheme.tabBarBackground.hex),
        tabBarBorder: WLDColor(light: LightTheme.tabBarBorder.hex, dark: DarkTheme.tabBarBorder.hex)
    )
}
