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
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { Tokens } from '../../theme';
import { useTheme } from '../../context';
import { createStyles } from './login.styles';
import { strings } from './login.strings';
import { useLogin } from './login.hooks';
import { GoogleIcon, AppleIcon } from '../../components';

export default function LoginScreen() {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    loading,
    openSignUpDisplay,
    handleAuth0Login,
    handleLogin
  } = useLogin();

  const iconSize = Tokens.scaleAsset(24);

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
            <Text style={styles.titleText}>Login</Text>

            {/* Input Fields */}
            <View style={styles.inputFieldsContainer}>
              {/* Email/Phone Input */}
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
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}
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
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
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
                <TouchableOpacity
                  onPress={() => {}}
                  activeOpacity={0.7}
                  style={styles.forgotPasswordContainer}
                >
                  <Text style={styles.forgotPasswordLink}>
                    {strings.buttons.forgotPassword}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Log In</Text>
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
                onPress={() => handleAuth0Login('google-oauth2')}
                activeOpacity={0.7}
              >
                <GoogleIcon size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialRoundButton}
                onPress={() => handleAuth0Login('apple')}
                activeOpacity={0.7}
              >
                <AppleIcon size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Not registered yet? </Text>
              <TouchableOpacity onPress={openSignUpDisplay} activeOpacity={0.7}>
                <Text style={styles.footerLinkText}>Sign Up &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}