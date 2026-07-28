import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native';
import { Tokens } from '../../theme/theme';
import { styles } from './login.styles';
import { strings } from './login.strings';
import { useLogin } from './login.hooks';
import CustomButton from '../../components/customButton';
import GoogleIcon from '../../components/svg/googleIcon';
import AppleIcon from '../../components/svg/appleIcon';

export default function LoginScreen() {
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
              {/* Email/Phone Input — Neumorphic Inset Well */}
              <View style={styles.inputOuterView}>
                <View style={styles.inputInnerContainer}>
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    placeholder={strings.placeholders.identifier}
                    placeholderTextColor="#94A3B8"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}
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
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                    >
                      {passwordVisible ? (
                        <EyeOff size={iconSize} color="#6B7280" />
                      ) : (
                        <Eye size={iconSize} color="#6B7280" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.strengthView}>
                  <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.7}
                    style={styles.strengthTextRow}
                  >
                    <Text style={styles.passwordStrengthText}>
                      {strings.buttons.forgotPassword}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.continueButtonView}>
              {loading ? (
                <ActivityIndicator size="large" color="#6C63FF" />
              ) : (
                <CustomButton
                  variant="primary"
                  onPress={handleLogin}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  title={loading ? 'Logging in...' : strings.buttons.login}
                  disabled={loading}
                  buttonStyle={{ borderRadius: 16 }}
                />
              )}

              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>
              </View>

              <View style={styles.socialsView1}>
                <CustomButton
                  title={strings.buttons.google}
                  Icon={GoogleIcon}
                  iconColor="#3D4852"
                  variant="secondary"
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: 16 }}
                  onPress={() => handleAuth0Login('google-oauth2')}
                />

                <CustomButton
                  title={strings.buttons.apple}
                  Icon={AppleIcon}
                  iconColor="#3D4852"
                  variant="secondary"
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: 16 }}
                  onPress={() => handleAuth0Login('apple')}
                />
              </View>

              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  New here?{' '}
                  <View style={styles.signupText}>
                    <TouchableOpacity onPress={openSignUpDisplay}>
                      <Text style={styles.loginLink}>
                        {strings.buttons.signup}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}