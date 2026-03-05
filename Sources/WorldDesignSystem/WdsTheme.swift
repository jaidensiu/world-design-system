import Foundation

/// Semantic color set for the World Design System.
/// All values are hex strings (e.g. "FFFFFF") – the consuming app bridges to its own color type.
public struct WdsSemanticColors: Sendable {
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

public enum WdsTheme {
    public static let light = WdsSemanticColors(
        backgroundPrimary: WdsLightColorTokens.backgroundPrimary,
        backgroundSecondary: WdsLightColorTokens.backgroundSecondary,
        backgroundTertiary: WdsLightColorTokens.backgroundTertiary,
        textPrimary: WdsLightColorTokens.textPrimary,
        textSecondary: WdsLightColorTokens.textSecondary,
        textTertiary: WdsLightColorTokens.textTertiary,
        textInverse: WdsLightColorTokens.textInverse,
        borderDefault: WdsLightColorTokens.borderDefault,
        borderStrong: WdsLightColorTokens.borderStrong,
        actionPrimary: WdsLightColorTokens.actionPrimary,
        actionPrimaryContent: WdsLightColorTokens.actionPrimaryContent,
        actionSecondary: WdsLightColorTokens.actionSecondary,
        actionDisabled: WdsLightColorTokens.actionDisabled,
        actionDisabledContent: WdsLightColorTokens.actionDisabledContent,
        statusError: WdsLightColorTokens.statusError,
        statusWarning: WdsLightColorTokens.statusWarning,
        statusSuccess: WdsLightColorTokens.statusSuccess,
        statusInfo: WdsLightColorTokens.statusInfo,
        tabBarSelected: WdsLightColorTokens.tabBarSelected,
        tabBarUnselected: WdsLightColorTokens.tabBarUnselected,
        tabBarBackground: WdsLightColorTokens.tabBarBackground,
        tabBarBorder: WdsLightColorTokens.tabBarBorder
    )

    public static let dark = WdsSemanticColors(
        backgroundPrimary: WdsDarkColorTokens.backgroundPrimary,
        backgroundSecondary: WdsDarkColorTokens.backgroundSecondary,
        backgroundTertiary: WdsDarkColorTokens.backgroundTertiary,
        textPrimary: WdsDarkColorTokens.textPrimary,
        textSecondary: WdsDarkColorTokens.textSecondary,
        textTertiary: WdsDarkColorTokens.textTertiary,
        textInverse: WdsDarkColorTokens.textInverse,
        borderDefault: WdsDarkColorTokens.borderDefault,
        borderStrong: WdsDarkColorTokens.borderStrong,
        actionPrimary: WdsDarkColorTokens.actionPrimary,
        actionPrimaryContent: WdsDarkColorTokens.actionPrimaryContent,
        actionSecondary: WdsDarkColorTokens.actionSecondary,
        actionDisabled: WdsDarkColorTokens.actionDisabled,
        actionDisabledContent: WdsDarkColorTokens.actionDisabledContent,
        statusError: WdsDarkColorTokens.statusError,
        statusWarning: WdsDarkColorTokens.statusWarning,
        statusSuccess: WdsDarkColorTokens.statusSuccess,
        statusInfo: WdsDarkColorTokens.statusInfo,
        tabBarSelected: WdsDarkColorTokens.tabBarSelected,
        tabBarUnselected: WdsDarkColorTokens.tabBarUnselected,
        tabBarBackground: WdsDarkColorTokens.tabBarBackground,
        tabBarBorder: WdsDarkColorTokens.tabBarBorder
    )
}
