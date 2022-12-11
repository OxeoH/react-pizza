import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Search from '../components/Search'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



describe('With React Testing Library', () => {
  const initialState = {output:10}
  const mockStore = configureStore()
  let store

  it('Search renders', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><Search /></Provider>)

    expect(screen.getByPlaceholderText('Поищи, что по вкусу 🍕')).toBeInTheDocument()
  })
})

