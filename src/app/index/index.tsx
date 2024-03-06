import { useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'

import { Ingredient, Selected } from '@/components'

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

  const onClearSelected = () => {
    Alert.alert('Atenção', 'Deseja limpar tudo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => setSelected([]) },
    ])
  }

  const handleSearch = () => {
    router.navigate('/recipes')
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

      {selected.length > 0 ? (
        <Selected
          quantity={selected.length}
          onClear={onClearSelected}
          onSearch={handleSearch}
        />
      ) : null}
    </View>
  )
}

export default App
