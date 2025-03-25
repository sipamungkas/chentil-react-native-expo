import { Pressable, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Plus size={24} color={colors.text.inverse} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
}); 