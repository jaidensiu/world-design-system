import Foundation

/// Semantic color set for the World Design System.
/// All values are hex strings (e.g. "FFFFFF") – the consuming app bridges to its own color type.
public struct WDSSemanticColors: Sendable {
    // Background
    public let backgroundPrimary: String
    public let backgroundSecondary: String
    public let backgroundTertiary: String
    // Text
    public let textPrimary: String
    public let textSecondary: String
    public let textTertiary: String
    public let textInverse: String
    // Border
    public let borderDefault: String
    public let borderStrong: String
    // Action
    public let actionPrimary: String
    public let actionPrimaryContent: String
    public let actionSecondary: String
    public let actionDisabled: String
    public let actionDisabledContent: String
    // Status
    public let statusError: String
    public let statusWarning: String
    public let statusSuccess: String
    public let statusInfo: String
    // Tab Bar
    public let tabBarSelected: String
    public let tabBarUnselected: String
    public let tabBarBackground: String
    public let tabBarBorder: String
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
}
