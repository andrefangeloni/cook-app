import { StyleSheet } from 'react-native'

import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    padding: 24,
    alignSelf: 'center',
    backgroundColor: theme.colors.black,
    borderRadius: theme.borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 34,
  },
  label: {
    color: theme.colors.white,
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.regular,
  },
})
