import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Eye, EyeOff } from 'lucide-react-native';
import { Tokens } from '../../theme/theme';
import { googleIcon, appleIcon, CustomButton } from '../../components/index';
import { styles } from './login.styles';
import { strings } from './login.strings';
import { useLogin } from './login.hooks';

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
    handleGoogleLogin,
    handleAuth0Login,
    handleLogin
  } = useLogin();

  const iconSize = Tokens.scaleAsset(24);
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
                  colors={['#ace9fd', '#bdedfd']}
                  start={{ x: 0.01, y: 0.5 }}
                  end={{ x: 0.99, y: 0.5 }}
                  style={styles.inputGradientBackground}
                >
                  <TextInput
                    style={[styles.inputText, { flex: 1 }]}
                    placeholder={strings.placeholders.identifier}
                    placeholderTextColor="#312f2f"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}

                  />
                </LinearGradient>
              </View>

              <View style={styles.passwordView}>
                <View style={styles.inputOuterView}>
                  <LinearGradient
                    colors={['#ace9fd', '#bdedfd']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder={strings.placeholders.password}
                      placeholderTextColor="#292929"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
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

                <View style={styles.strengthView}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
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
                <ActivityIndicator size="large" color="#3bc7f6" />
              ) : (
                <CustomButton
                  colors={['#98e1f9', '#98e1f9', '#98e1f9', '#98e1f9']}
                  onPress={handleLogin}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  title={loading ? 'Logging in...' : strings.buttons.login}
                  disabled={loading}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                />
              )}
              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>
              </View>

              <View style={styles.socialsView1}>
                <CustomButton
                  title={strings.buttons.google}
                  Icon={googleIcon}
                  iconColor="#000000"
                  colors={['#ace9fd', '#bdedfd']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => handleAuth0Login('google-oauth2')}
                />

                <CustomButton
                  title={strings.buttons.apple}
                  Icon={appleIcon}
                  iconColor="#000000"
                  colors={['#ace9fd', '#bdedfd']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => handleAuth0Login('apple')}
                />
              </View>

              <View style={styles.footerView}>

                <Text style={styles.footerText}>
                  New here?{' '}
                  <View style={styles.signupText}>
                    <TouchableOpacity
                      onPress={openSignUpDisplay}>
                      <Text
                        style={styles.loginLink}

                      >
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
    </LinearGradient>
  );
}


