import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <View accessible accessibilityLabel="Bahia Principe Hotels & Resorts" style={styles.container}>
      <Ionicons
        color={colors.gold400}
        name="sunny-outline"
        size={compact ? 34 : 44}
        style={styles.symbol}
      />
      <Text style={[styles.name, compact && styles.nameCompact]}>BAHIA PRINCIPE</Text>
      <Text style={[styles.tagline, compact && styles.taglineCompact]}>HOTELS &amp; RESORTS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  symbol: {
    marginBottom: 8,
  },
  name: {
    color: colors.white,
    fontSize: 27,
    fontWeight: '300',
    letterSpacing: 2.2,
  },
  nameCompact: {
    fontSize: 22,
  },
  tagline: {
    color: colors.slate100,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 3.4,
    marginTop: 8,
  },
  taglineCompact: {
    fontSize: 9,
    marginTop: 5,
  },
});
