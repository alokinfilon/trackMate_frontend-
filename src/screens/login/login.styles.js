import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/theme';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#E0E5EC',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    maxWidth: Tokens.layout.maxWidth,
    paddingVertical: Tokens.layout.paddingVertical,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: Tokens.gaps.separator,
    gap: Tokens.gaps.large,
    marginTop: Tokens.gaps.Lsection,
  },
  titleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#3D4852',
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#6B7280',
  },
  inputFieldsContainer: {
    width: '100%',
    gap: Tokens.gaps.medium + 5,
    marginBottom: Tokens.gaps.section,
  },
  inputOuterView: {
    width: '100%',
    height: Tokens.components.inputHeight,
    borderRadius: 16,
    backgroundColor: '#E0E5EC',
    overflow: 'hidden',
    // Neumorphic inset shadow (simulated with border trick)
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.25)',
  },
  inputInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(163, 177, 198, 0.08)',
    borderRadius: 16,
  },
  inputText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#3D4852',
    padding: 0,
    height: '100%',
  },
  passwordView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  eyeButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Tokens.gaps.small,
  },
  continueButtonView: {
    width: '100%',
    gap: Tokens.gaps.medium,
    alignItems: 'center',
  },
  primaryButtonWrapper: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    borderRadius: 16,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
  },
  primaryButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  socialsView: {
    width: '100%',
    gap: Tokens.gaps.medium,
    alignItems: 'center',
  },
  socialsView1: {
    width: '100%',
    alignItems: 'center',
  },
  orSignUpWithText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#6B7280',
    marginVertical: 4,
  },
  socialButton: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    backgroundColor: '#E0E5EC',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  socialIconLayout: {
    marginRight: 8,
  },
  socialButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#3D4852',
  },
  passwordStrengthText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 15,
    color: '#6B7280',
  },
  footerView: {
    width: '100%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#3D4852',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: Tokens.typography.families.semiBold,
    textDecorationLine: 'underline',
    color: '#6C63FF',
  },
  signupText: {
    marginTop: 5,
  },
});