import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, Printer, Edit } from 'lucide-react'
import { format } from 'date-fns'

const ArticlePreview = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    // 模拟从API获取文章数据
    // 在实际应用中，这里应该从API获取文章数据
    const articles = JSON.parse(localStorage.getItem('articles') || '[]')
    const foundArticle = articles.find(a => a.id === id)
    
    if (foundArticle) {
      setArticle(foundArticle)
    } else {
      // 模拟一个示例文章
      setArticle({
        id,
        title: '探索人工智能在内容创作中的应用',
        content: `# 探索人工智能在内容创作中的应用

## 引言

随着人工智能技术的迅猛发展，其在内容创作领域的应用日益广泛。AI不仅能辅助创作，还能进行内容生成、优化和分发，为内容创作者提供了前所未有的工具和可能性。

## AI辅助创作的主要应用

### 1. 文本生成与优化

AI可以基于提示词生成各类文本内容，包括新闻报道、产品描述、故事情节等。同时，AI还能对已有文本进行优化，提升其可读性和吸引力。

### 2. 图像与视频创作

通过AI图像生成技术，创作者可以根据文字描述生成相应的图像，省去了寻找合适素材的时间。在视频领域，AI可辅助剪辑、特效添加和内容摘要。

### 3. 个性化内容推荐

AI算法能分析用户行为和偏好，为其推荐最可能感兴趣的内容，提高内容触达率和用户满意度。

## AI创作的优势与挑战

### 优势

- 提高创作效率，减少重复性工作
- 突破创意瓶颈，提供新的灵感来源
- 实现内容的规模化生产和个性化定制

### 挑战

- 原创性和版权问题
- 内容质量与人工智能局限性
- 伦理考量与社会影响

## 未来展望

随着大语言模型和多模态AI的发展，人工智能在内容创作中的应用将更加深入和广泛。创作者需要学习如何与AI协同工作，发挥各自优势，共同创造更高质量的内容。

## 结论

人工智能正在重塑内容创作的方式和流程。对于创作者而言，拥抱AI技术，将其作为创作工具而非竞争对手，才能在数字时代保持竞争力和创新能力。`,
        tags: ['人工智能', '内容创作', '技术应用'],
        author: '科技观察员',
        topics: ['科技前沿', '数字媒体'],
        createdAt: new Date().toISOString(),
        views: 1256,
        likes: 43,
        comments: 8
      })
    }
  }, [id])
  
  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-toutiao-red border-gray-200 rounded-full animate-spin"></div>
      </div>
    )
  }
  
  const handleLike = () => {
    setIsLiked(!isLiked)
    
    // 更新文章点赞数
    if (!isLiked) {
      const updatedArticle = {...article, likes: (article.likes || 0) + 1}
      setArticle(updatedArticle)
      
      // 在实际应用中，这里应该将更新发送到API
      const articles = JSON.parse(localStorage.getItem('articles') || '[]')
      const updatedArticles = articles.map(a => a.id === id ? updatedArticle : a)
      localStorage.setItem('articles', JSON.stringify(updatedArticles))
    }
  }
  
  const handleSave = () => {
    setIsSaved(!isSaved)
    // 在实际应用中，这里应该将收藏状态发送到API
  }
  
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm')
    } catch (e) {
      return dateString
    }
  }
  
  // 将Markdown转换为HTML（简单实现，实际应用中应使用专门的Markdown解析库）
  const renderMarkdown = (markdown) => {
    const sections = markdown.split('\n\n')
    return sections.map((section, index) => {
      if (section.startsWith('# ')) {
        return <h1 key={index} className="mt-8 mb-4 text-3xl font-bold">{section.substring(2)}</h1>
      } else if (section.startsWith('## ')) {
        return <h2 key={index} className="mt-6 mb-3 text-2xl font-bold">{section.substring(3)}</h2>
      } else if (section.startsWith('### ')) {
        return <h3 key={index} className="mt-5 mb-2 text-xl font-semibold">{section.substring(4)}</h3>
      } else if (section.startsWith('- ')) {
        return (
          <ul key={index} className="pl-5 mt-2 mb-4 list-disc">
            {section.split('\n').map((item, i) => (
              <li key={i} className="mb-1">{item.substring(2)}</li>
            ))}
          </ul>
        )
      } else {
        return <p key={index} className="mb-4 leading-7">{section}</p>
      }
    })
  }
  
  return (
    <div className="py-8 bg-white">
      <div className="max-w-4xl px-6 mx-auto">
        {/* 返回按钮 */}
        <Link to="/articles" className="flex items-center mb-6 text-gray-600 hover:text-toutiao-red">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>返回文章列表</span>
        </Link>
        
        {/* 文章标题 */}
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{article.title}</h1>
        
        {/* 文章元信息 */}
        <div className="flex flex-wrap items-center mb-8 text-sm text-gray-500">
          <div className="mr-6">
            <span className="font-medium">作者：</span>
            <span>{article.author || '您'}</span>
          </div>
          <div className="mr-6">
            <span className="font-medium">发布时间：</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="mr-6">
            <span className="font-medium">阅读：</span>
            <span>{article.views || 0}</span>
          </div>
          <div>
            <span className="font-medium">点赞：</span>
            <span>{article.likes || 0}</span>
          </div>
        </div>
        
        {/* 标签 */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* 文章内容 */}
        <div className="mb-10 article-content">
          {renderMarkdown(article.content)}
        </div>
        
        {/* 交互工具栏 */}
        <div className="flex items-center justify-between py-4 mt-8 border-t border-b">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center px-3 py-2 rounded-full hover:bg-gray-100 ${isLiked ? 'text-toutiao-red' : 'text-gray-600'}`}
            >
              <ThumbsUp className="w-5 h-5 mr-1" fill={isLiked ? 'currentColor' : 'none'} />
              <span>{article.likes || 0}</span>
            </button>
            
            <button className="flex items-center px-3 py-2 text-gray-600 rounded-full hover:bg-gray-100">
              <MessageSquare className="w-5 h-5 mr-1" />
              <span>{article.comments || 0}</span>
            </button>
            
            <button className="flex items-center px-3 py-2 text-gray-600 rounded-full hover:bg-gray-100">
              <Share2 className="w-5 h-5 mr-1" />
              <span>分享</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleSave}
              className={`flex items-center px-3 py-2 rounded-full hover:bg-gray-100 ${isSaved ? 'text-toutiao-red' : 'text-gray-600'}`}
            >
              <Bookmark className="w-5 h-5 mr-1" fill={isSaved ? 'currentColor' : 'none'} />
              <span>收藏</span>
            </button>
            
            <button className="flex items-center px-3 py-2 text-gray-600 rounded-full hover:bg-gray-100">
              <Printer className="w-5 h-5 mr-1" />
              <span>打印</span>
            </button>
          </div>
        </div>
        
        {/* 编辑按钮 */}
        <div className="flex justify-center mt-8">
          <Link
            to={`/create?edit=${article.id}`}
            className="flex items-center px-4 py-2 font-medium text-white rounded-lg bg-toutiao-red hover:bg-red-600"
          >
            <Edit className="w-5 h-5 mr-2" />
            <span>编辑文章</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticlePreview
