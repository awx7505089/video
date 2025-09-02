import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Trash2, Edit, Filter, Search, Eye, ThumbsUp, Calendar, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'

const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, published, draft
  
  useEffect(() => {
    // 从本地存储加载文章
    // 在实际应用中，这里应该从API获取文章列表
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
    
    // 如果没有保存的文章，创建一些示例文章
    if (savedArticles.length === 0) {
      const exampleArticles = [
        {
          id: '1',
          title: '5G技术将如何改变我们的生活？',
          createdAt: '2023-11-20T08:24:00Z',
          views: 1240,
          likes: 45,
          isDraft: false,
          tags: ['5G', '科技', '未来'],
          topics: ['科技前沿']
        },
        {
          id: '2',
          title: '最新研究显示：每天喝咖啡有助于延长寿命',
          createdAt: '2023-11-18T14:30:00Z',
          views: 980,
          likes: 32,
          isDraft: false,
          tags: ['健康', '研究', '生活方式'],
          topics: ['健康生活']
        },
        {
          id: '3',
          title: '年轻人买房还是租房？专家给出这样的建议',
          createdAt: '2023-11-15T11:15:00Z',
          views: 1560,
          likes: 67,
          isDraft: false,
          tags: ['房产', '理财', '生活规划'],
          topics: ['财经动态']
        },
        {
          id: '4',
          title: '学会这几个烹饪技巧，轻松做出餐厅级美食（草稿）',
          createdAt: '2023-11-10T09:45:00Z',
          views: 0,
          likes: 0,
          isDraft: true,
          tags: ['美食', '烹饪', '生活技巧'],
          topics: ['生活方式']
        }
      ]
      
      localStorage.setItem('articles', JSON.stringify(exampleArticles))
      setArticles(exampleArticles)
    } else {
      setArticles(savedArticles)
    }
  }, [])
  
  useEffect(() => {
    // 过滤和搜索文章
    let result = [...articles]
    
    // 根据状态过滤
    if (filter === 'published') {
      result = result.filter(article => !article.isDraft)
    } else if (filter === 'draft') {
      result = result.filter(article => article.isDraft)
    }
    
    // 根据搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(article => 
        article.title.toLowerCase().includes(term) || 
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(term)))
      )
    }
    
    // 按时间排序，最新的在前面
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    setFilteredArticles(result)
  }, [articles, filter, searchTerm])
  
  const handleDeleteArticle = (id) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      const updatedArticles = articles.filter(article => article.id !== id)
      setArticles(updatedArticles)
      localStorage.setItem('articles', JSON.stringify(updatedArticles))
    }
  }
  
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd')
    } catch (e) {
      return dateString
    }
  }
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FileText className="w-6 h-6 mr-3 text-toutiao-red" />
          <h1 className="text-2xl font-bold">我的文章</h1>
        </div>
        <Link
          to="/create"
          className="flex items-center px-4 py-2 text-white rounded-lg bg-toutiao-red hover:bg-red-600"
        >
          <Edit className="w-5 h-5 mr-2" />
          <span>创建文章</span>
        </Link>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md">
          <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文章标题或标签"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
          >
            <option value="all">全部文章</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
      </div>
      
      {/* 文章列表 */}
      {filteredArticles.length > 0 ? (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-500 bg-gray-50">
                <th className="px-6 py-3 font-medium">标题</th>
                <th className="px-6 py-3 font-medium">状态</th>
                <th className="px-6 py-3 font-medium">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>发布时间</span>
                  </div>
                </th>
                <th className="px-6 py-3 font-medium">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>阅读量</span>
                  </div>
                </th>
                <th className="px-6 py-3 font-medium">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>点赞</span>
                  </div>
                </th>
                <th className="px-6 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredArticles.map(article => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <Link to={`/preview/${article.id}`} className="font-medium text-gray-900 hover:text-toutiao-red">
                        {article.title}
                      </Link>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 text-xs bg-gray-100 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      article.isDraft 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {article.isDraft ? '草稿' : '已发布'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {article.isDraft ? '-' : article.views || 0}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {article.isDraft ? '-' : article.likes || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link 
                        to={`/preview/${article.id}`}
                        className="p-1 text-blue-600 rounded hover:bg-blue-50"
                        title="查看"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link 
                        to={`/create?edit=${article.id}`}
                        className="p-1 text-yellow-600 rounded hover:bg-yellow-50"
                        title="编辑"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-1 text-red-600 rounded hover:bg-red-50"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg">
          <FileText className="w-16 h-16 mb-4 text-gray-300" />
          <h3 className="mb-2 text-xl font-medium text-gray-900">暂无文章</h3>
          <p className="mb-6 text-gray-500">您还没有创建任何文章，或没有符合筛选条件的文章</p>
          <Link
            to="/create"
            className="flex items-center px-4 py-2 text-white rounded-lg bg-toutiao-red hover:bg-red-600"
          >
            <Edit className="w-5 h-5 mr-2" />
            <span>创建您的第一篇文章</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ArticleList
