import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, forwardRef } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

type IconName = ComponentProps<typeof Ionicons>['name'];

type FormFieldProps = TextInputProps & {
  icon: IconName;
  hasError?: boolean;
  trailingIcon?: IconName;
  trailingLabel?: string;
  onTrailingPress?: () => void;
};

export const FormField = forwardRef<TextInput, FormFieldProps>(
  function FormField(
    {
      icon,
      hasError = false,
      trailingIcon,
      trailingLabel,
      onTrailingPress,
      style,
      ...inputProps
    },
    ref,
  ) {
    return (
      <View style={[styles.container, hasError && styles.containerError]}>
        <Ionicons color={colors.slate300} name={icon} size={23} />
        <TextInput
          placeholderTextColor={colors.slate300}
          ref={ref}
          selectionColor={colors.blue500}
          style={[styles.input, style]}
          {...inputProps}
        />
        {trailingIcon && onTrailingPress ? (
          <Pressable
            accessibilityLabel={trailingLabel}
            accessibilityRole="button"
            hitSlop={12}
            onPress={onTrailingPress}
            style={({ pressed }) => [styles.trailingButton, pressed && styles.pressed]}
          >
            <Ionicons color={colors.slate300} name={trailingIcon} size={22} />
          </Pressable>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(3, 23, 45, 0.78)',
    borderColor: 'rgba(183, 205, 226, 0.48)',
    borderRadius: layout.radius,
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 17,
  },
  containerError: {
    borderColor: colors.red400,
  },
  input: {
    color: colors.white,
    flex: 1,
    fontSize: 16,
    height: '100%',
    marginLeft: 13,
    paddingVertical: 0,
  },
  trailingButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    marginRight: -10,
    width: 44,
  },
  pressed: {
    opacity: 0.65,
  },
});
