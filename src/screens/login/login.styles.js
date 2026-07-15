import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/theme';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f3ecec',
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
    marginTop:Tokens.gaps.Lsection,
  },
  titleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#020202',
  },
  subtitleText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#000000',
  },
  inputFieldsContainer: {
    width: '100%',
    gap: Tokens.gaps.medium+5,
    marginBottom: Tokens.gaps.section,
  },
  inputOuterView: {
    width: '100%',
    height: Tokens.components.inputHeight,
    borderRadius: Tokens.components.radiusInput,
    overflow: 'hidden',
  },
  inputGradientBackground: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#323537',
    borderRadius: Tokens.components.radiusInput,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#000000',
    padding: 0,
    height: '100%',
  },
  passwordView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  eyeButton: {
    width: 24,
    height: 24,
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
    borderRadius: Tokens.components.radiusButton,
    shadowColor: 'rgba(0, 0, 0, 0.64)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    flex: 1,
    borderRadius: Tokens.components.radiusButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#000000',
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
    color: '#1e1e1e',
    marginVertical: 4,
  },
  socialButton: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    backgroundColor: '#56c6ec',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: Tokens.components.radiusButton,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconLayout: {
    marginRight: 5,
  },
  socialButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#000000',
  },

  passwordStrengthText :{
fontFamily: Tokens.typography.families.regular,
    fontSize: 15,
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
    color: '#000000',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: Tokens.typography.families.semiBold,
    textDecorationLine: 'underline',
    color: '#000000',
  },
  
  signupText :{
    marginTop:5
  }
});