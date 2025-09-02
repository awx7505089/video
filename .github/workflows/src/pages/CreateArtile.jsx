import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, Save, Image, FileText, Send, RefreshCw, ListPlus, Tag } from 'lucide-react'
import { nanoid } from 'nanoid'

const CreateArticle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const topicFromUrl = searchParams.get('topic') || ''
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [title, setTitle] = useState(topicFromUrl)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [selectedTopics, setSelectedTopics] = useState([])
  const [generationPrompt, setGenerationPrompt] = useState('')
  
  const topics = [
    '社会热点', '财经动态', '科技前沿', '娱乐八卦', 
    '健康生活', '教育资讯', '时事政治', '体育赛事'
  ]
  
  // 模拟文章生成过程
  const generateArticle = () => {
    setIsGenerating(true)
    setGenerationStep(1)
    
    // 模拟进度
    const steps = [
      '正在分析热点话题...',
      '正在收集相关素材...',
      '正在组织文章结构...',
      '正在生成文章内容...',
      '正在优化文章标题...',
      '正在校对文章内容...',
    ]
    
    let currentStep = 0
    
    const interval = setInterval(() => {
      currentStep += 1
      setGenerationStep(currentStep)
      
      if (currentStep >= steps.length) {
        clearInterval(interval)
        
        // 模拟生成的文章内容
        const generatedContent = `# ${title || '热点话题分析'}

## 背景介绍

近期，这一话题在社交媒体上引发广泛讨论。根据最新数据显示，相关搜索量在过去一周内增长了57%，成为公众关注的焦点。

## 主要观点

专家认为，这一现象反映了当代社会的几个重要趋势：

1. 技术创新正在加速改变人们的生活方式
2. 消费者对产品质量和服务体验的要求不断提高
3. 社会价值观正在经历显著变化

## 深度分析

从长远来看，这一趋势将对各行各业产生深远影响。企业需要积极应对，调整战略以适应新的市场环境。同时，个人也应当提升自身能力，以应对未来可能出现的挑战。

## 未来展望

随着社会继续发展，我们可以预见：

- 创新将成为企业核心竞争力
- 个性化需求将推动市场细分
- 可持续发展理念将进一步普及

## 结论

总体而言，这一热点话题反映了社会正在经历的深刻变革。无论是企业还是个人，都需要保持开放心态，积极拥抱变化，才能在新时代中获得成功。`
        
        setContent(generatedContent)
        setIsGenerating(false)
        
        // 生成一些相关标签
        if (title) {
          const generatedTags = title.split(' ')
            .filter(word => word.length > 1)
            .slice(0, 3)
          setTags(generatedTags)
        }
      }
    }, 800)
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTopicToggle = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  const handleSaveDraft = () => {
    const articleId = nanoid(8)
    const article = {
      id: articleId,
      title: title || '未命名文章',
      content,
      tags,
      topics: selectedTopics,
      createdAt: new Date().toISOString(),
      isDraft: true
    }
    
    // 在实际应用中，这里应该将文章保存到数据库或发送到API
    // 这里只是模拟保存
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
    localStorage.setItem('articles', JSON.stringify([...savedArticles, article]))
    
    alert('草稿已保存')
    navigate('/articles')
  }

  const handlePublish = () => {
    const articleId = nanoid(8)
    const article = {
      id: articleId,
      title: title || '未命名文章',
      content,
      tags,
      topics: selectedTopics,
      createdAt: new Date().toISOString(),
      isDraft: false,
      views: 0,
      likes: 0
    }
    
    // 在实际应用中，这里应该将文章发布到API
    // 这里只是模拟保存
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]')
    localStorage.setItem('articles', JSON.stringify([...savedArticles, article]))
    
    alert('文章已发布')
    navigate(`/preview/${articleId}`)
  }

  const generationSteps = [
    '准备生成文章',
    '分析热点话题',
    '收集相关素材',
    '组织文章结构',
    '生成文章内容',
    '优化文章标题',
    '校对文章内容',
  ]

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold">创作文章</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 主编辑区 */}
        <div className="col-span-2 space-y-6">
          {/* 文章标题 */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <label className="block mb-2 text-sm font-medium text-gray-700">文章标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入吸引人的标题"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
            />
          </div>
          
          {/* 文章内容 */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">文章内容</label>
              <button className="flex items-center text-sm text-gray-500 hover:text-toutiao-red">
                <Image className="w-4 h-4 mr-1" />
                <span>插入图片</span>
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里编写或粘贴您的文章内容..."
              className="w-full h-96 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
            ></textarea>
          </div>
          
          {/* 文章预览 */}
          {content && (
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium">预览</h3>
              <div className="p-4 border rounded-lg article-content">
                <h1 className="mb-4 text-2xl font-bold">{title || '未命名文章'}</h1>
                <div className="whitespace-pre-line">
                  {content}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* AI生成区 */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="flex items-center mb-4 text-lg font-medium">
              <Sparkles className="w-5 h-5 mr-2 text-toutiao-red" />
              <span>AI助手</span>
            </h3>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">生成提示</label>
              <textarea
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                placeholder="描述您想要生成的文章内容，例如：'生成一篇关于人工智能在教育领域应用的文章'"
                className="w-full h-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
              ></textarea>
            </div>
            
            <button
              onClick={generateArticle}
              disabled={isGenerating}
              className="flex items-center justify-center w-full px-4 py-2 mb-4 font-medium text-white transition-colors rounded-lg bg-toutiao-red hover:bg-red-600 disabled:bg-gray-400"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>智能生成文章</span>
                </>
              )}
            </button>
            
            {isGenerating && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">生成进度</span>
                  <span className="text-sm text-gray-500">{generationStep}/{generationSteps.length - 1}</span>
                </div>
                <div className="w-full h-2 mb-3 overflow-hidden bg-gray-200 rounded-full">
                  <div 
                    className="h-full transition-all bg-toutiao-red" 
                    style={{ width: `${(generationStep / (generationSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{generationSteps[generationStep]}</p>
              </div>
            )}
          </div>
          
          {/* 标签 */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="flex items-center mb-4 text-lg font-medium">
              <Tag className="w-5 h-5 mr-2 text-toutiao-red" />
              <span>文章标签</span>
            </h3>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="添加标签"
                className="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 font-medium text-white rounded-r-lg bg-toutiao-red hover:bg-red-600"
              >
                添加
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="flex items-center px-3 py-1 text-sm bg-gray-100 rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-toutiao-red"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {tags.length === 0 && (
                <span className="text-sm text-gray-500">暂无标签，添加标签有助于提高文章曝光</span>
              )}
            </div>
          </div>
          
          {/* 话题分类 */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="flex items-center mb-4 text-lg font-medium">
              <ListPlus className="w-5 h-5 mr-2 text-toutiao-red" />
              <span>选择话题</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicToggle(topic)}
                  className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-toutiao-red text-white border-toutiao-red'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-toutiao-red'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center justify-center px-4 py-3 font-medium text-toutiao-red bg-white border border-toutiao-red rounded-lg hover:bg-red-50"
            >
              <Save className="w-5 h-5 mr-2" />
              <span>保存草稿</span>
            </button>
            
            <button
              onClick={handlePublish}
              className="flex items-center justify-center px-4 py-3 font-medium text-white rounded-lg bg-toutiao-red hover:bg-red-600"
            >
              <Send className="w-5 h-5 mr-2" />
              <span>发布文章</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateArticle
