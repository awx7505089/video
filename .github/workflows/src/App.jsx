import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CreateArticle from './pages/CreateArticle'
import ArticlePreview from './pages/ArticlePreview'
import HotTopics from './pages/HotTopics'
import ArticleList from './pages/ArticleList'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<CreateArticle />} />
        <Route path="preview/:id" element={<ArticlePreview />} />
        <Route path="hot-topics" element={<HotTopics />} />
        <Route path="articles" element={<ArticleList />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
