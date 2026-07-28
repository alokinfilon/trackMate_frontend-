import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CheckMarkl,
  googleIcon,
  appleIcon,
  CustomButton
} from '../../components/index';
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
    <View style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#E0E5EC" />
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
              {/* Identifier Input — Neumorphic Inset */}
              <View style={styles.inputOuterView}>
                <View style={styles.inputInnerContainer}>
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    placeholder={strings.placeholders.identifier}
                    placeholderTextColor="#94A3B8"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.passwordView}>
                <View style={styles.inputOuterView}>
                  <View style={styles.inputInnerContainer}>
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder={strings.placeholders.password}
                      placeholderTextColor="#94A3B8"
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
                        <EyeOff size={iconSize} color="#6B7280" />
                      ) : (
                        <Eye size={iconSize} color="#6B7280" />
                      )}
                    </TouchableOpacity>
                  </View>
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
                              strengthScore >= 1 ? activeBarColor : '#D5DAE1',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 2 ? activeBarColor : '#D5DAE1',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 3 ? activeBarColor : '#D5DAE1',
                          },
                        ]}
                      />
                      <View
                        style={[
                          styles.meterBar,
                          {
                            backgroundColor:
                              strengthScore >= 4 ? activeBarColor : '#D5DAE1',
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
                                    borderColor: '#38B2AC',
                                    backgroundColor: 'rgba(56,178,172,0.1)',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#38B2AC"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#E53E3E"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasMinLength && { color: '#38B2AC' },
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
                                    borderColor: '#38B2AC',
                                    backgroundColor: 'rgba(56,178,172,0.1)',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#38B2AC"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#E53E3E"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasCaseLetters && { color: '#38B2AC' },
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
                                    borderColor: '#38B2AC',
                                    backgroundColor: 'rgba(56,178,172,0.1)',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#38B2AC"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#E53E3E"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasSpecialChar && { color: '#38B2AC' },
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
                                    borderColor: '#38B2AC',
                                    backgroundColor: 'rgba(56,178,172,0.1)',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#38B2AC"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#E53E3E"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasNumber && { color: '#38B2AC' },
                            ]}
                          >
                            A Number
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {/* Info Bar — Neumorphic inset well */}
                <View style={styles.infoBarView}>
                  <View style={styles.infoBarInnerView}>
                    <Info
                      size={34}
                      color="#6C63FF"
                      style={styles.infoIconSpacing}
                    />
                    <Text style={styles.infoBarText}>
                     {strings.text.notice}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputView}>
                <View style={styles.inputOuterView}>
                  <View style={styles.inputInnerContainer}>
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder={strings.placeholders.confirmPassword}
                      placeholderTextColor="#94A3B8"
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
                        <EyeOff size={iconSize} color="#6B7280" />
                      ) : (
                        <Eye size={iconSize} color="#6B7280" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {isConfirmPasswordFocused && confirmPassword.length > 0 && (
                  <View style={styles.passwordMatchedRow}>
                    <Text
                      style={[
                        styles.passwordMatchedText,
                        isPasswordMatched && { color: '#38B2AC' },
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
                            ? '#38B2AC'
                            : '#E53E3E',
                          backgroundColor: isPasswordMatched
                            ? 'rgba(56,178,172,0.1)'
                            : 'rgba(229,62,62,0.1)',
                        },
                      ]}
                    >
                      {isPasswordMatched ? (
                        <CheckMarkl
                          size={feedbackIconSize - 2}
                          color="#38B2AC"
                          strokeWidth={4}
                        />
                      ) : (
                        <X
                          size={feedbackIconSize - 2}
                          color="#E53E3E"
                          strokeWidth={3}
                        />
                      )}
                    </View>
                  </View>
                )}
              </View>

              {/* Checkbox — Neumorphic */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.8}
              >
                {termsAccepted ? (
                  <View style={styles.checkmarkBoxActive}>
                    <Check
                      size={feedbackIconSize}
                      color="#FFFFFF"
                      strokeWidth={3}
                    />
                  </View>
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
                <ActivityIndicator size="large" color="#6C63FF" />
              ) : (
                <CustomButton
                  variant="primary"
                  onPress={handleSignUp}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  title={strings.buttons.continue}
                  buttonStyle={{ borderRadius: 16 }}
                />
              )}

              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>

                <CustomButton
                  title={strings.buttons.google}
                  Icon={googleIcon}
                  iconColor="#3D4852"
                  variant="secondary"
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: 16 }}
                  onPress={() => handleAuth0Signup('google-oauth2')}
                />

                <CustomButton
                   title={strings.buttons.apple}
                  Icon={appleIcon}
                  iconColor="#3D4852"
                  variant="secondary"
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: 16 }}
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
    </View>
  );
}
