import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage'
import { PokemonPage } from './pages';
import { SearchPage } from './pages/SearchPage';

export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Navigation /> }>
            <Route index element={<HomePage />}/>
            <Route path='pokemon/:id' element={<PokemonPage />} />
            <Route path='search' element={<SearchPage />} />
        </Route>

        <Route path='*' element={<navigate to='/'/>}/>
    </Routes>
  )
}
