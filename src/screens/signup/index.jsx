import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Check, X, Info, Mail, Lock } from 'lucide-react-native';
import { Tokens } from '../../theme';
import { useTheme } from '../../context';
import { createStyles } from './signup.styles';
import { strings } from './signup.strings';
import { useSignup } from './signup.hooks';
import { apiClient } from '../../services';
import { GoogleIcon, AppleIcon, CheckMarkl, AppModal } from '../../components';
const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<h1>(.*?)<\/h1>/gi, '\n$1\n\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '\n$1\n\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n$1\n\n')
    .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<li>(.*?)<\/li>/gi, '• $1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
};

export default function SignUpScreen() {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const [termsModalVisible, setTermsModalVisible] = React.useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = React.useState(false);
  const [termsText, setTermsText] = React.useState('');
  const [loadingTerms, setLoadingTerms] = React.useState(false);
  const [privacyText, setPrivacyText] = React.useState('');
  const [loadingPrivacy, setLoadingPrivacy] = React.useState(false);

  const fallbackTerms = `Welcome to TrackMate. By using our application, you agree to comply with and be bound by the following terms.

1. Use of Service: You agree to use the application only for lawful purposes related to planning and managing your trips and bookings.

2. User Accounts: You are responsible for maintaining the confidentiality of your account credentials and password.

3. Privacy: Your use of the service is also governed by our Privacy Policy, which details how we collect and use your data.

4. Booking & Payments: TrackMate handles travel coordination and pricing displays. All actual bookings are subject to availability and the respective operator policies.

5. Cancellations: Booking cancellations can be done via the upcoming tab or booking detail summaries, subject to our cancellation policies.`;

  const fallbackPrivacy = `Your privacy is important to us. Here is how TrackMate handles your personal information:

1. Information Collection: We collect information you provide directly, such as your email address, profile credentials, and travel details.

2. Information Usage: We use your data to manage your bookings, customize travel recommendations, and improve app functionality.

3. Security: We implement standard security measures to protect your account data and credentials against unauthorized access.

4. Data Sharing: We do not sell your personal data to third parties. We share data only as needed to process bookings with service operators.`;

  const fetchTerms = async () => {
    setTermsModalVisible(true);
    if (termsText) return;
    setLoadingTerms(true);
    try {
      const response = await apiClient('/api/terms');
      const text = await response.text();
      let contentData = '';
      try {
        const parsed = JSON.parse(text);
        contentData = parsed.content || text;
      } catch (e) {
        contentData = text;
      }
      const cleaned = stripHtml(contentData);
      setTermsText(cleaned || fallbackTerms);
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTermsText(fallbackTerms);
    } finally {
      setLoadingTerms(false);
    }
  };

  const fetchPrivacy = async () => {
    setPrivacyModalVisible(true);
    if (privacyText) return;
    setLoadingPrivacy(true);
    try {
      const response = await apiClient('/api/privacy-policy');
      const text = await response.text();
      let contentData = '';
      try {
        const parsed = JSON.parse(text);
        contentData = parsed.content || text;
      } catch (e) {
        contentData = text;
      }
      const cleaned = stripHtml(contentData);
      setPrivacyText(cleaned || fallbackPrivacy);
    } catch (error) {
      console.error('Error fetching privacy:', error);
      setPrivacyText(fallbackPrivacy);
    } finally {
      setLoadingPrivacy(false);
    }
  };

  React.useEffect(() => {
    const prefetch = async () => {
      try {
        const termsRes = await apiClient('/api/terms');
        const text = await termsRes.text();
        let contentData = '';
        try {
          const parsed = JSON.parse(text);
          contentData = parsed.content || text;
        } catch (e) {
          contentData = text;
        }
        const cleaned = stripHtml(contentData);
        if (cleaned) {
          setTermsText(cleaned);
        }
      } catch (err) {
        console.error('Prefetch terms error:', err);
      }

      try {
        const privacyRes = await apiClient('/api/privacy-policy');
        const text = await privacyRes.text();
        let contentData = '';
        try {
          const parsed = JSON.parse(text);
          contentData = parsed.content || text;
        } catch (e) {
          contentData = text;
        }
        const cleaned = stripHtml(contentData);
        if (cleaned) {
          setPrivacyText(cleaned);
        }
      } catch (err) {
        console.error('Prefetch privacy error:', err);
      }
    };
    prefetch();
  }, []);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenContainer}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? colors.bg : '#F8FAFC'}
        translucent={false}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cardContainer}>
            {/* Logo Image */}
            <Image
              source={require('../../../logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />

            {/* Centered Title */}
            <Text style={styles.titleText}>Sign Up</Text>

            {/* Input Fields */}
            <View style={styles.inputFieldsContainer}>
              {/* Identifier Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Email</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Mail size={20} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Enter your email"
                    placeholderTextColor="#94A3B8"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Password</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Lock size={20} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Create a password"
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
                  >
                    {passwordVisible ? (
                      <EyeOff size={iconSize} color="#94A3B8" />
                    ) : (
                      <Eye size={iconSize} color="#94A3B8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Password Strength Indicator */}
              {isPasswordFocused && (
                <View style={styles.strengthView}>
                  <View style={styles.strengthTextRow}>
                    <Text style={styles.passwordStrengthText}>Password Strength</Text>
                    <Text style={[styles.strongValueText, password.length > 0 && { color: activeBarColor }]}>
                      {strengthLabel}
                    </Text>
                  </View>

                  <View style={styles.navigationMeterRow}>
                    <View style={[styles.meterBar, { backgroundColor: strengthScore >= 1 ? activeBarColor : (isDarkMode ? colors.border : '#E5E7EB') }]} />
                    <View style={[styles.meterBar, { backgroundColor: strengthScore >= 2 ? activeBarColor : (isDarkMode ? colors.border : '#E5E7EB') }]} />
                    <View style={[styles.meterBar, { backgroundColor: strengthScore >= 3 ? activeBarColor : (isDarkMode ? colors.border : '#E5E7EB') }]} />
                    <View style={[styles.meterBar, { backgroundColor: strengthScore >= 4 ? activeBarColor : (isDarkMode ? colors.border : '#E5E7EB') }]} />
                  </View>

                  {/* Requirements List */}
                  <View style={styles.requirementView}>
                    <Text style={styles.requirementText}>Password Requirements:</Text>
                    <View style={styles.indicationView}>
                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          {hasMinLength ? (
                            <Check size={feedbackIconSize} color="#38B2AC" strokeWidth={3} />
                          ) : (
                            <X size={feedbackIconSize} color="#E53E3E" strokeWidth={3} />
                          )}
                        </View>
                        <Text style={[styles.requirementItemText, hasMinLength && styles.requirementSuccessText]}>
                          Minimum 8 characters length
                        </Text>
                      </View>

                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          {hasCaseLetters ? (
                            <Check size={feedbackIconSize} color="#38B2AC" strokeWidth={3} />
                          ) : (
                            <X size={feedbackIconSize} color="#E53E3E" strokeWidth={3} />
                          )}
                        </View>
                        <Text style={[styles.requirementItemText, hasCaseLetters && styles.requirementSuccessText]}>
                          Mix of lowercase and uppercase letters
                        </Text>
                      </View>

                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          {hasSpecialChar ? (
                            <Check size={feedbackIconSize} color="#38B2AC" strokeWidth={3} />
                          ) : (
                            <X size={feedbackIconSize} color="#E53E3E" strokeWidth={3} />
                          )}
                        </View>
                        <Text style={[styles.requirementItemText, hasSpecialChar && styles.requirementSuccessText]}>
                          At least one special character
                        </Text>
                      </View>

                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          {hasNumber ? (
                            <Check size={feedbackIconSize} color="#38B2AC" strokeWidth={3} />
                          ) : (
                            <X size={feedbackIconSize} color="#E53E3E" strokeWidth={3} />
                          )}
                        </View>
                        <Text style={[styles.requirementItemText, hasNumber && styles.requirementSuccessText]}>
                          At least one number
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* Password notice bar */}
              {isPasswordFocused && (
                <View style={styles.infoBarView}>
                  <View style={styles.infoBarInnerView}>
                    <Info size={16} color="#FF6B35" style={styles.infoIconSpacing} />
                    <Text style={styles.infoBarText}>{strings.text.notice}</Text>
                  </View>
                </View>
              )}

              {/* Confirm Password Input */}
              <View style={styles.formGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabel}>Confirm Password</Text>
                </View>
                <View style={styles.inputFieldContainer}>
                  <Lock size={20} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Confirm your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!confirmPasswordVisible}
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    style={styles.eyeButton}
                    activeOpacity={0.7}
                  >
                    {confirmPasswordVisible ? (
                      <EyeOff size={iconSize} color="#94A3B8" />
                    ) : (
                      <Eye size={iconSize} color="#94A3B8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Password Match Status */}
              {isConfirmPasswordFocused && confirmPassword.length > 0 && (
                <View style={styles.passwordMatchedRow}>
                  <View style={styles.iconBoxCenter}>
                    {isPasswordMatched ? (
                      <Check size={14} color="#38B2AC" strokeWidth={3} />
                    ) : (
                      <X size={14} color="#E53E3E" strokeWidth={3} />
                    )}
                  </View>
                  <Text style={[styles.passwordMatchedText, isPasswordMatched && styles.requirementSuccessText]}>
                    {isPasswordMatched ? 'Passwords match' : 'Passwords do not match'}
                  </Text>
                </View>
              )}

              {/* Terms Checkbox */}
              <View style={styles.formGroup}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() => setTermsAccepted(!termsAccepted)}
                    activeOpacity={0.8}
                  >
                    {termsAccepted ? (
                      <View style={styles.checkmarkBoxActive}>
                        <CheckMarkl
                          size={feedbackIconSize}
                          stroke="#FFFFFF"
                          strokeWidth={3}
                        />
                      </View>
                    ) : (
                      <View style={styles.checkmarkBoxInactive} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Text
                      style={styles.termsLink}
                      onPress={fetchTerms}
                    >
                      Terms &amp; Conditions
                    </Text>{' '}
                    and{' '}
                    <Text
                      style={styles.termsLink}
                      onPress={fetchPrivacy}
                    >
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignUp}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialsContainer}>
              <TouchableOpacity
                style={styles.socialRoundButton}
                onPress={() => handleAuth0Signup('google-oauth2')}
                activeOpacity={0.7}
              >
                <GoogleIcon size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialRoundButton}
                onPress={() => handleAuth0Signup('apple')}
                activeOpacity={0.7}
              >
                <AppleIcon size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={openLoginDisplay} activeOpacity={0.7}>
                <Text style={styles.footerLinkText}>Log In &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Terms & Conditions Modal */}
      <AppModal
        title="Terms & Conditions"
        visible={termsModalVisible}
        onClose={() => setTermsModalVisible(false)}
      >
        {loadingTerms ? (
          <View style={styles.modalLoaderContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
          </View>
        ) : (
          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={true}>
            <Text style={styles.modalText}>
              {termsText}
            </Text>
          </ScrollView>
        )}
      </AppModal>

      {/* Privacy Policy Modal */}
      <AppModal
        title="Privacy Policy"
        visible={privacyModalVisible}
        onClose={() => setPrivacyModalVisible(false)}
      >
        {loadingPrivacy ? (
          <View style={styles.modalLoaderContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
          </View>
        ) : (
          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={true}>
            <Text style={styles.modalText}>
              {privacyText}
            </Text>
          </ScrollView>
        )}
      </AppModal>
    </KeyboardAvoidingView>
  );
}
