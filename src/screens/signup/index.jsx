import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {
  CheckMarkl,
  googleIcon,
  appleIcon,
  CustomButton
} from '../../components/index';
import LinearGradient from 'react-native-linear-gradient';
import { Eye, EyeOff, Check, X, Info } from 'lucide-react-native';
import { Tokens } from '../../theme/theme';
import { styles } from './signup.styles';
import { strings } from './signup.strings';
import { useSignup } from './signup.hooks';

export default function SignUpScreen() {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    termsAccepted,
    setTermsAccepted,
    openLoginDisplay,
    hasMinLength,
    hasCaseLetters,
    hasSpecialChar,
    hasNumber,
    strengthScore,
    handleSignUp,
    strengthLabel,
    activeBarColor,
    isPasswordMatched,
    handleAuth0Signup
  } = useSignup();

  const iconSize = Tokens.scaleAsset(24);
  const feedbackIconSize = Tokens.scaleAsset(12);

  return (
    <LinearGradient
      colors={['#ace9fd', '#ffffff']}
      start={{ x: 0.44, y: 0 }}
      end={{ x: 0.54, y: 0.98 }}
      style={styles.screenContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.titleText}>{strings.header.title}</Text>
              <Text style={styles.subtitleText}>
                {strings.header.subtitle}
              </Text>
            </View>

            <View style={styles.inputFieldsContainer}>
              <View style={styles.inputOuterView}>
                <LinearGradient
                  colors={['#ffffff', '#ffffff']}
                  start={{ x: 0.01, y: 0.5 }}
                  end={{ x: 0.99, y: 0.5 }}
                  style={styles.inputGradientBackground}
                >
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    placeholder={strings.placeholders.identifier}
                    placeholderTextColor="#000000"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                  />
                </LinearGradient>
              </View>

              <View style={styles.passwordView}>
                <View style={styles.inputOuterView}>
                  <LinearGradient
                   colors={['#ffffff', '#ffffff']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder={strings.placeholders.password}
                      placeholderTextColor="#000000"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                      keyboardShouldPersistTaps="handled"
                    >
                      {passwordVisible ? (
                        <EyeOff size={iconSize} color="#000000" />
                      ) : (
                        <Eye size={iconSize} color="#000000" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {isPasswordFocused && (
                  <View style={styles.strengthView}>
                    <View style={styles.strengthTextRow}>
                      <Text style={styles.passwordStrengthText}>
                        Password Strength
                      </Text>
                      <Text
                        style={[
                          styles.strongValueText,
                          password.length > 0 && { color: activeBarColor },
                        ]}
                      >
                        {strengthLabel}
                      </Text>
                    </View>

                    <View style={styles.navigationMeterRow}>
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 1 ? activeBarColor : '#45bbe9',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 2 ? activeBarColor : '#E5E5E5',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 3 ? activeBarColor : '#E5E5E5',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 4 ? activeBarColor : '#E5E5E5',
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.requirementView}>
                      <Text style={styles.requirementText}>
                        Password must include
                      </Text>
                      <View style={styles.indicationView}>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasMinLength ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasMinLength && { color: '#2BBA52' },
                            ]}
                          >
                            At least 8 characters
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasCaseLetters ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasCaseLetters && { color: '#2BBA52' },
                            ]}
                          >
                            Capital and lowercase letters
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasSpecialChar ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasSpecialChar && { color: '#2BBA52' },
                            ]}
                          >
                            A special character - # @ $ % & ! * _ ? ^ -
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasNumber ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasNumber && { color: '#2BBA52' },
                            ]}
                          >
                            A Number
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.infoBarView}>
                  <LinearGradient
                    colors={['#ace9fd', '#bdedfd']}
                    start={{ x: 0.02, y: 0.5 }}
                    end={{ x: 0.98, y: 0.5 }}
                    style={styles.infoBarInnerView}
                  >
                    <Info
                      size={34}
                      color="#000000"
                      style={styles.infoIconSpacing}
                    />
                    <Text style={styles.infoBarText}>
                     {strings.text.notice}
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              <View style={styles.inputView}>
                <View style={styles.inputOuterView}>
                  <LinearGradient
                    colors={['#ffffff', '#ffffff']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder={strings.placeholders.confirmPassword}
                      placeholderTextColor="#000000"
                      secureTextEntry={!confirmPasswordVisible}
                      autoCapitalize="none"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                      keyboardShouldPersistTaps="handled"
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff size={iconSize} color="#000000" />
                      ) : (
                        <Eye size={iconSize} color="#000000" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                {isConfirmPasswordFocused && confirmPassword.length > 0 && (
                  <View style={styles.passwordMatchedRow}>
                    <Text
                      style={[
                        styles.passwordMatchedText,
                        isPasswordMatched && { color: '#2BBA52' },
                      ]}
                    >
                      {isPasswordMatched
                        ? 'Your password matched'
                        : 'Passwords do not match'}
                    </Text>
                    <View
                      style={[
                        styles.checkmarkCircleWrapper,
                        {
                          width: feedbackIconSize * 1.6,
                          height: feedbackIconSize * 1.6,
                          borderRadius: (feedbackIconSize * 1.8) / 2,
                          borderColor: isPasswordMatched
                            ? '#2BBA52'
                            : '#F16646',
                          backgroundColor: isPasswordMatched
                            ? '#2BBA521A'
                            : '#F166461A',
                        },
                      ]}
                    >
                      {isPasswordMatched ? (
                        <CheckMarkl
                          size={feedbackIconSize - 2}
                          color="#2BBA52"
                          strokeWidth={4}
                        />
                      ) : (
                        <X
                          size={feedbackIconSize - 2}
                          color="#F16646"
                          strokeWidth={3}
                        />
                      )}
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.8}
              >
                {termsAccepted ? (
                  <LinearGradient
                    colors={['#19bff7', '#05b4ee', '#04b7f3', '#0397c8']}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.7, y: 0.5 }}
                    style={styles.checkmarkBoxActive}
                  >
                    <Check
                      size={feedbackIconSize}
                      color="#656464"
                      strokeWidth={3}
                    />
                  </LinearGradient>
                ) : (
                  <View style={styles.checkmarkBoxInactive} />
                )}
                <Text style={styles.checkboxLabel}>
                  {strings.text.notice}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.continueButtonView}>
              {loading ? (
                <ActivityIndicator size="large" color="#50c9f1" />
              ) : (
                <CustomButton
                  colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                  onPress={handleSignUp}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  title={strings.buttons.continue}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                />
              )}

              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>

                <CustomButton
                  title={strings.buttons.google}
                  Icon={googleIcon}
                  iconColor="#1c1c1c"
                  colors={['#ffffff', '#ffffff']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => handleAuth0Signup('google-oauth2')}
                />

                <CustomButton
                   title={strings.buttons.apple}
                  Icon={appleIcon}
                  iconColor="#141313"
                  colors={['#ffffff', '#ffffff']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => handleAuth0Signup('apple')}
                />
              </View>

              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  Already have an account?{' '}
                  <TouchableOpacity
                    onPress={openLoginDisplay}
                    style={styles.loginText}
                  >
                    <Text style={styles.loginLink}>{strings.buttons.login}</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

