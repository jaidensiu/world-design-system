package com.worldcoin.designsystem

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Semantic color interface for the World Design System.
 * All fields map to semantic token names.
 */
data class WDSColors(
    // Background
    val backgroundPrimary: Color,
    val backgroundSecondary: Color,
    val backgroundTertiary: Color,
    // Text
    val textPrimary: Color,
    val textSecondary: Color,
    val textTertiary: Color,
    val textInverse: Color,
    // Border
    val borderDefault: Color,
    val borderStrong: Color,
    // Action
    val actionPrimary: Color,
    val actionPrimaryContent: Color,
    val actionSecondary: Color,
    val actionDisabled: Color,
    val actionDisabledContent: Color,
    // Status
    val statusError: Color,
    val statusWarning: Color,
    val statusSuccess: Color,
    val statusInfo: Color,
    // Tab Bar
    val tabBarSelected: Color,
    val tabBarUnselected: Color,
    val tabBarBackground: Color,
    val tabBarBorder: Color,
)

fun lightColors() = WDSColors(
    backgroundPrimary = LightColorTokens.backgroundPrimary,
    backgroundSecondary = LightColorTokens.backgroundSecondary,
    backgroundTertiary = LightColorTokens.backgroundTertiary,
    textPrimary = LightColorTokens.textPrimary,
    textSecondary = LightColorTokens.textSecondary,
    textTertiary = LightColorTokens.textTertiary,
    textInverse = LightColorTokens.textInverse,
    borderDefault = LightColorTokens.borderDefault,
    borderStrong = LightColorTokens.borderStrong,
    actionPrimary = LightColorTokens.actionPrimary,
    actionPrimaryContent = LightColorTokens.actionPrimaryContent,
    actionSecondary = LightColorTokens.actionSecondary,
    actionDisabled = LightColorTokens.actionDisabled,
    actionDisabledContent = LightColorTokens.actionDisabledContent,
    statusError = LightColorTokens.statusError,
    statusWarning = LightColorTokens.statusWarning,
    statusSuccess = LightColorTokens.statusSuccess,
    statusInfo = LightColorTokens.statusInfo,
    tabBarSelected = LightColorTokens.tabBarSelected,
    tabBarUnselected = LightColorTokens.tabBarUnselected,
    tabBarBackground = LightColorTokens.tabBarBackground,
    tabBarBorder = LightColorTokens.tabBarBorder,
)

fun darkColors() = WDSColors(
    backgroundPrimary = DarkColorTokens.backgroundPrimary,
    backgroundSecondary = DarkColorTokens.backgroundSecondary,
    backgroundTertiary = DarkColorTokens.backgroundTertiary,
    textPrimary = DarkColorTokens.textPrimary,
    textSecondary = DarkColorTokens.textSecondary,
    textTertiary = DarkColorTokens.textTertiary,
    textInverse = DarkColorTokens.textInverse,
    borderDefault = DarkColorTokens.borderDefault,
    borderStrong = DarkColorTokens.borderStrong,
    actionPrimary = DarkColorTokens.actionPrimary,
    actionPrimaryContent = DarkColorTokens.actionPrimaryContent,
    actionSecondary = DarkColorTokens.actionSecondary,
    actionDisabled = DarkColorTokens.actionDisabled,
    actionDisabledContent = DarkColorTokens.actionDisabledContent,
    statusError = DarkColorTokens.statusError,
    statusWarning = DarkColorTokens.statusWarning,
    statusSuccess = DarkColorTokens.statusSuccess,
    statusInfo = DarkColorTokens.statusInfo,
    tabBarSelected = DarkColorTokens.tabBarSelected,
    tabBarUnselected = DarkColorTokens.tabBarUnselected,
    tabBarBackground = DarkColorTokens.tabBarBackground,
    tabBarBorder = DarkColorTokens.tabBarBorder,
)

val LocalWDSColors = staticCompositionLocalOf { lightColors() }

@Composable
fun WDSTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colors = if (darkTheme) darkColors() else lightColors()
    CompositionLocalProvider(LocalWDSColors provides colors) {
        content()
    }
}

object WDS {
    val colors: WDSColors
        @Composable
        get() = LocalWDSColors.current
}
