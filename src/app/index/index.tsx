import { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'

import { Ingredient, Selected } from '@/components'

import { ingredientsService } from '@/services'

import { styles } from './styles'

const App = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

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
    router.navigate(`/recipes/${selected}`)
  }

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await ingredientsService.findAll()
      setIngredients(data)
    }

    loadIngredients()
  }, [])

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
        {ingredients.map((item) => (
          <Ingredient
            key={item.id}
            name={item.name}
            image={item.image}
            selected={selected.includes(item.id)}
            onPress={() => onToggleSelected(item.id)}
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
