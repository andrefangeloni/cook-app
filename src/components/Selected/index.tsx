import { Text, View } from 'react-native'
import Animated, { BounceOutDown, SlideInDown } from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'

import { theme } from '@/theme'

import { styles } from './styles'

type Props = {
  quantity: number
  onClear: () => void
  onSearch: () => void
}

export const Selected = ({ quantity, onClear, onSearch }: Props) => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown}
      exiting={BounceOutDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>
          {`${quantity} ingrediente(s) selecionado(s)`}
        </Text>

        <MaterialIcons
          name="close"
          size={24}
          color={theme.colors.gray_400}
          onPress={onClear}
        />
      </View>
    </Animated.View>
  )
}
