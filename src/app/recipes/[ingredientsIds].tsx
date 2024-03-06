import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { Ingredients, Recipe } from '@/components'

import { ingredientsService, recipesService } from '@/services'

import { styles } from './styles'

const Recipes = () => {
  const params = useLocalSearchParams<{ ingredientsIds: string }>()

  const ingredientsIds = params.ingredientsIds.split(',')

  const [recipes, setRecipes] = useState<RecipeResponse[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await ingredientsService.findByIds(ingredientsIds)
      setIngredients(data)
    }

    loadIngredients()
  }, [])

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await recipesService.findByIngredientsIds(ingredientsIds)
      setRecipes(data)
    }

    loadRecipes()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />

        <Text style={styles.title}>Ingredientes</Text>
      </View>

      <Ingredients ingredients={ingredients} />

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Recipe recipe={item} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  )
}

export default Recipes
