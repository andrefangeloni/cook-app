import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Ingredient } from '@/components'

import { styles } from './styles'

const App = () => {
  const [selected, setSelected] = useState<string[]>([])

  const onToggleSelected = (value: string) => {
    const alreadySelected = selected.some((item) => item === value)

    if (alreadySelected) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>

      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>

      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 20 }).map((item, index) => (
          <Ingredient
            key={index}
            name="Maçã"
            image="https://robohash.org/37f58f0c0e340f4594945c19bc66244d?set=set4&bgset=&size=400x400"
            selected={selected.includes(String(index))}
            onPress={() => onToggleSelected(String(index))}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default App
