import { supabase } from './supabase'

export const findAll = async () => {
  const { data } = await supabase
    .from('ingredients')
    .select()
    .order('name')
    .returns<IngredientResponse[]>()

  return data || []
}
