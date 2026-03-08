package com.jaidensiu.worldDesignSystem

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Semantic color interface for the World Design System.
 * All fields map to semantic token names.
 */
data class WdsColors(
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

fun lightColors() = WdsColors(
    backgroundPrimary = WdsLightColorTokens.backgroundPrimary,
    backgroundSecondary = WdsLightColorTokens.backgroundSecondary,
    backgroundTertiary = WdsLightColorTokens.backgroundTertiary,
    textPrimary = WdsLightColorTokens.textPrimary,
    textSecondary = WdsLightColorTokens.textSecondary,
    textTertiary = WdsLightColorTokens.textTertiary,
    textInverse = WdsLightColorTokens.textInverse,
    borderDefault = WdsLightColorTokens.borderDefault,
    borderStrong = WdsLightColorTokens.borderStrong,
    actionPrimary = WdsLightColorTokens.actionPrimary,
    actionPrimaryContent = WdsLightColorTokens.actionPrimaryContent,
    actionSecondary = WdsLightColorTokens.actionSecondary,
    actionDisabled = WdsLightColorTokens.actionDisabled,
    actionDisabledContent = WdsLightColorTokens.actionDisabledContent,
    statusError = WdsLightColorTokens.statusError,
    statusWarning = WdsLightColorTokens.statusWarning,
    statusSuccess = WdsLightColorTokens.statusSuccess,
    statusInfo = WdsLightColorTokens.statusInfo,
    tabBarSelected = WdsLightColorTokens.tabBarSelected,
    tabBarUnselected = WdsLightColorTokens.tabBarUnselected,
    tabBarBackground = WdsLightColorTokens.tabBarBackground,
    tabBarBorder = WdsLightColorTokens.tabBarBorder,
)

fun darkColors() = WdsColors(
    backgroundPrimary = WdsDarkColorTokens.backgroundPrimary,
    backgroundSecondary = WdsDarkColorTokens.backgroundSecondary,
    backgroundTertiary = WdsDarkColorTokens.backgroundTertiary,
    textPrimary = WdsDarkColorTokens.textPrimary,
    textSecondary = WdsDarkColorTokens.textSecondary,
    textTertiary = WdsDarkColorTokens.textTertiary,
    textInverse = WdsDarkColorTokens.textInverse,
    borderDefault = WdsDarkColorTokens.borderDefault,
    borderStrong = WdsDarkColorTokens.borderStrong,
    actionPrimary = WdsDarkColorTokens.actionPrimary,
    actionPrimaryContent = WdsDarkColorTokens.actionPrimaryContent,
    actionSecondary = WdsDarkColorTokens.actionSecondary,
    actionDisabled = WdsDarkColorTokens.actionDisabled,
    actionDisabledContent = WdsDarkColorTokens.actionDisabledContent,
    statusError = WdsDarkColorTokens.statusError,
    statusWarning = WdsDarkColorTokens.statusWarning,
    statusSuccess = WdsDarkColorTokens.statusSuccess,
    statusInfo = WdsDarkColorTokens.statusInfo,
    tabBarSelected = WdsDarkColorTokens.tabBarSelected,
    tabBarUnselected = WdsDarkColorTokens.tabBarUnselected,
    tabBarBackground = WdsDarkColorTokens.tabBarBackground,
    tabBarBorder = WdsDarkColorTokens.tabBarBorder,
)

val LocalWdsColors = staticCompositionLocalOf { lightColors() }

@Composable
fun WdsTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val colors = if (darkTheme) darkColors() else lightColors()
    CompositionLocalProvider(LocalWdsColors provides colors) {
        content()
    }
}

object Wds {
    val colors: WdsColors
        @Composable
        get() = LocalWdsColors.current
}
