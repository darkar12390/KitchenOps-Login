import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

const welcomeSteps = [
  {
    eyebrow: 'BIENVENIDO A KITCHENOPS',
    icon: 'restaurant-outline',
    title: 'Aprender la normativa no tiene que ser un rollo',
    copy: 'Aquí convertirás las reglas y buenas prácticas de cocina en aprendizajes claros, cortos y fáciles de aplicar.',
  },
  {
    eyebrow: 'HECHO PARA EL EQUIPO',
    icon: 'people-outline',
    title: 'Para quienes hacen que la cocina funcione',
    copy: 'KitchenOps acompaña a cocineros, supervisores y personal operativo que quiere trabajar con seguridad y confianza.',
  },
  {
    eyebrow: 'A TU RITMO',
    icon: 'sparkles-outline',
    title: 'Listo para aprender sin apagar los fogones',
    copy: 'Avanza en lecciones breves, pon a prueba lo aprendido y lleva cada idea directo a tu día a día.',
  },
] as const;

export default function HomeScreen() {
  const [welcomeStep, setWelcomeStep] = useState(0);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const currentStep = welcomeSteps[welcomeStep];
  const isLastStep = welcomeStep === welcomeSteps.length - 1;

  const handleWelcomeAction = () => {
    if (isLastStep) {
      setWelcomeComplete(true);
      return;
    }

    setWelcomeStep((step) => step + 1);
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/images/resort-background.png')}
      style={styles.background}
    >
      <View pointerEvents="none" style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <View>
              <Text style={styles.eyebrow}>KITCHEN OPS ACADEMY</Text>
              <Text style={styles.greeting}>¡Hola, demo!</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons color={colors.white} name="person" size={23} />
            </View>
          </View>

          {!welcomeComplete ? (
            <View style={styles.welcomeStage}>
              <View style={styles.welcomeCard}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepEyebrow}>{currentStep.eyebrow}</Text>
                  <Text style={styles.stepCount}>
                    {welcomeStep + 1}/{welcomeSteps.length}
                  </Text>
                </View>

                <View style={styles.welcomeIcon}>
                  <Ionicons color={colors.blue500} name={currentStep.icon} size={36} />
                </View>

                <Text accessibilityRole="header" style={styles.welcomeTitle}>
                  {currentStep.title}
                </Text>
                <Text style={styles.welcomeCopy}>{currentStep.copy}</Text>

                <View
                  accessible
                  accessibilityLabel={`Paso ${welcomeStep + 1} de ${welcomeSteps.length}`}
                  style={styles.dots}
                >
                  {welcomeSteps.map((step, index) => (
                    <View
                      key={step.eyebrow}
                      style={[styles.dot, index === welcomeStep && styles.dotActive]}
                    />
                  ))}
                </View>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleWelcomeAction}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.primaryButtonPressed,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>
                    {isLastStep ? 'Empezar mi ruta' : 'Siguiente'}
                  </Text>
                  <Ionicons
                    color={colors.white}
                    name={isLastStep ? 'rocket-outline' : 'arrow-forward'}
                    size={20}
                  />
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Ionicons color={colors.blue500} name="checkmark-circle" size={36} />
              </View>
              <Text style={styles.cardTitle}>¡Todo listo para comenzar!</Text>
              <Text style={styles.cardCopy}>
                Tu ruta de aprendizaje sobre normativa y buenas prácticas estará disponible
                próximamente.
              </Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressValue} />
              </View>
              <Text style={styles.progressLabel}>Bienvenida completada</Text>
            </View>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace('/')}
            style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
          >
            <Ionicons color={colors.white} name="log-out-outline" size={20} />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.navy950,
    flex: 1,
  },
  overlay: {
    bottom: 0,
    backgroundColor: 'rgba(1, 17, 38, 0.78)',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignSelf: 'center',
    flexGrow: 1,
    maxWidth: layout.maxContentWidth,
    padding: layout.screenPadding,
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  eyebrow: {
    color: colors.blue100,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  greeting: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 6,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.blue500,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'rgba(7, 32, 59, 0.9)',
    borderColor: 'rgba(179, 207, 231, 0.32)',
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 64,
    padding: 28,
  },
  welcomeStage: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 22,
  },
  welcomeCard: {
    backgroundColor: 'rgba(7, 32, 59, 0.94)',
    borderColor: 'rgba(179, 207, 231, 0.32)',
    borderRadius: 24,
    borderWidth: 1,
    padding: 26,
    shadowColor: colors.navy950,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  stepHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepEyebrow: {
    color: colors.blue100,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.15,
  },
  stepCount: {
    color: colors.slate300,
    fontSize: 12,
    fontWeight: '700',
  },
  welcomeIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.blue100,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    marginTop: 28,
    width: 68,
  },
  welcomeTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.35,
    lineHeight: 32,
    marginTop: 22,
    textAlign: 'center',
  },
  welcomeCopy: {
    color: colors.slate300,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 13,
    textAlign: 'center',
  },
  dots: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    marginTop: 27,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  dotActive: {
    backgroundColor: colors.blue500,
    width: 22,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.blue500,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: layout.radius,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 56,
    justifyContent: 'center',
    marginTop: 25,
  },
  primaryButtonPressed: {
    backgroundColor: colors.blue600,
    transform: [{ scale: 0.995 }],
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.blue100,
    borderRadius: 31,
    height: 62,
    justifyContent: 'center',
    width: 62,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 20,
    textAlign: 'center',
  },
  cardCopy: {
    color: colors.slate300,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
    textAlign: 'center',
  },
  progressTrack: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 5,
    height: 8,
    marginTop: 28,
    overflow: 'hidden',
    width: '100%',
  },
  progressValue: {
    backgroundColor: colors.green400,
    borderRadius: 5,
    height: '100%',
    width: '16%',
  },
  progressLabel: {
    color: colors.slate300,
    fontSize: 12,
    marginTop: 10,
  },
  logoutButton: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'rgba(255, 255, 255, 0.42)',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 9,
    marginTop: 'auto',
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  logoutText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
