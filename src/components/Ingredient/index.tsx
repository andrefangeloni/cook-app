import { Image, Pressable, PressableProps, Text } from 'react-native'

import { styles } from './styles'

type Props = PressableProps & {
  name: string
  image: string
  selected?: boolean
}

export const Ingredient = ({ name, image, selected, ...rest }: Props) => (
  <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
    <Image style={styles.image} source={{ uri: image }} />

    <Text style={styles.title}>{name}</Text>
  </Pressable>
)
