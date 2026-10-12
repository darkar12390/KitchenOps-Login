import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandLogo } from '../components/BrandLogo';
import { FormField } from '../components/FormField';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

const DEMO_USERNAME = 'demo';
const DEMO_PASSWORD = '1234';

type Feedback = {
  kind: 'error' | 'info';
  text: string;
};

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const passwordInput = useRef<TextInput>(null);
  const { height } = useWindowDimensions();
  const compact = height < 740;

  const clearFeedback = () => {
    if (feedback) {
      setFeedback(null);
    }
  };

  const handleLogin = () => {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername || !password) {
      setFeedback({ kind: 'error', text: 'Ingresa tu usuario y contraseña.' });
      return;
    }

    if (normalizedUsername !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setFeedback({
        kind: 'error',
        text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
      });
      return;
    }

    setFeedback(null);
    router.replace('/home');
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/images/resort-background.png')}
      style={styles.background}
    >
      <View pointerEvents="none" style={styles.overlay} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.flex}>
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={[styles.hero, compact && styles.heroCompact]}>
                <BrandLogo compact={compact} />
                <Text style={[styles.title, compact && styles.titleCompact]}>
                  Kitchen Ops Academy
                </Text>
                <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>
                  Aprende hoy, cocina un mejor mañana
                </Text>
              </View>

              <View style={[styles.form, compact && styles.formCompact]}>
                <FormField
                  accessibilityLabel="Usuario o empleado"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect={false}
                  hasError={feedback?.kind === 'error'}
                  icon="search-outline"
                  onChangeText={(value) => {
                    setUsername(value);
                    clearFeedback();
                  }}
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  placeholder="Usuario o empleado"
                  returnKeyType="next"
                  textContentType="username"
                  value={username}
                />
                <View style={styles.fieldSpacing} />
                <FormField
                  accessibilityLabel="Contraseña"
                  autoComplete="current-password"
                  hasError={feedback?.kind === 'error'}
                  icon="lock-closed-outline"
                  onChangeText={(value) => {
                    setPassword(value);
                    clearFeedback();
                  }}
                  onSubmitEditing={handleLogin}
                  placeholder="Contraseña"
                  ref={passwordInput}
                  returnKeyType="go"
                  secureTextEntry={!passwordVisible}
                  textContentType="password"
                  trailingIcon={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                  trailingLabel={passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onTrailingPress={() => setPasswordVisible((visible) => !visible)}
                  value={password}
                />

                <View style={styles.messageSlot}>
                  {feedback ? (
                    <Text
                      accessibilityLiveRegion="polite"
                      style={feedback.kind === 'error' ? styles.errorText : styles.infoText}
                    >
                      {feedback.text}
                    </Text>
                  ) : null}
                </View>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleLogin}
                  style={({ pressed }) => [styles.loginButton, pressed && styles.loginButtonPressed]}
                >
                  <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  hitSlop={10}
                  onPress={() =>
                    setFeedback({
                      kind: 'info',
                      text: 'La recuperación de contraseña se conectará en una próxima versión.',
                    })
                  }
                  style={({ pressed }) => [styles.forgotButton, pressed && styles.linkPressed]}
                >
                  <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                </Pressable>
              </View>

              <Text style={styles.footer}>
                Personas extraordinarias, experiencias inolvidables
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: colors.navy950,
    flex: 1,
  },
  overlay: {
    bottom: 0,
    backgroundColor: 'rgba(1, 17, 38, 0.68)',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    alignSelf: 'center',
    flex: 1,
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: layout.screenPadding,
    width: '100%',
  },
  hero: {
    alignItems: 'center',
    marginTop: 34,
  },
  heroCompact: {
    marginTop: 12,
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.7,
    marginTop: 45,
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 29,
    marginTop: 24,
  },
  subtitle: {
    color: colors.slate100,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitleCompact: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  form: {
    marginTop: 58,
  },
  formCompact: {
    marginTop: 30,
  },
  fieldSpacing: {
    height: 14,
  },
  messageSlot: {
    justifyContent: 'center',
    minHeight: 39,
    paddingHorizontal: 3,
  },
  errorText: {
    color: colors.red400,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  infoText: {
    color: colors.blue100,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: colors.blue500,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: layout.radius,
    borderWidth: 1,
    elevation: 4,
    height: 60,
    justifyContent: 'center',
    shadowColor: colors.navy950,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  loginButtonPressed: {
    backgroundColor: colors.blue600,
    transform: [{ scale: 0.995 }],
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.1,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 4,
  },
  forgotText: {
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  linkPressed: {
    opacity: 0.65,
  },
  footer: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 'auto',
    paddingBottom: 18,
    paddingTop: 48,
    textAlign: 'center',
  },
});
