import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Filter, PenSquare } from 'lucide-react'

const HotTopics = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'social', name: '社会' },
    { id: 'entertainment', name: '娱乐' },
    { id: 'tech', name: '科技' },
    { id: 'finance', name: '财经' },
    { id: 'sports', name: '体育' },
    { id: 'education', name: '教育' },
    { id: 'health', name: '健康' }
  ]
  
  const hotTopics = [
    { 
      id: 1, 
      title: '北京冬奥会闭幕式精彩回顾', 
      category: 'sports', 
      categoryName: '体育',
      trending: '+82%',
      hotIndex: 96,
      briefIntro: '北京冬奥会圆满落幕，闭幕式上有哪些精彩瞬间值得回味？',
      relatedKeywords: ['冬奥会', '闭幕式', '北京2022']
    },
    { 
      id: 2, 
      title: '新一轮科技革命浪潮下的人工智能发展', 
      category: 'tech', 
      categoryName: '科技',
      trending: '+65%',
      hotIndex: 92,
      briefIntro: '人工智能技术正在各行各业掀起变革，未来发展趋势如何？',
      relatedKeywords: ['AI', '人工智能', '科技革命']
    },
    { 
      id: 3, 
      title: '青少年近视率持续攀升，专家呼吁加强预防', 
      category: 'health', 
      categoryName: '健康',
      trending: '+43%',
      hotIndex: 89,
      briefIntro: '我国青少年近视率居高不下，专家提出了哪些有效的预防措施？',
      relatedKeywords: ['近视', '青少年健康', '视力保护']
    },
    { 
      id: 4, 
      title: '房地产市场新政策解读', 
      category: 'finance', 
      categoryName: '财经',
      trending: '+59%',
      hotIndex: 94,
      briefIntro: '多地出台房地产调控新政，对市场将产生哪些影响？',
      relatedKeywords: ['房地产', '调控政策', '楼市']
    },
    { 
      id: 5, 
      title: '如何科学备考高考？教育专家给出建议', 
      category: 'education', 
      categoryName: '教育',
      trending: '+38%',
      hotIndex: 87,
      briefIntro: '高考临近，如何科学复习、保持良好心态？专家支招。',
      relatedKeywords: ['高考', '备考', '学习方法']
    },
    { 
      id: 6, 
      title: '新一季热播剧掀起"古装热"', 
      category: 'entertainment', 
      categoryName: '娱乐',
      trending: '+71%',
      hotIndex: 91,
      briefIntro: '多部古装剧集收视率飙升，古装题材为何再次走红？',
      relatedKeywords: ['古装剧', '收视率', '影视热点']
    },
    { 
      id: 7, 
      title: '大学生就业形势分析', 
      category: 'social', 
      categoryName: '社会',
      trending: '+54%',
      hotIndex: 90,
      briefIntro: '今年高校毕业生人数再创新高，就业市场现状如何？',
      relatedKeywords: ['大学生就业', '就业市场', '求职']
    },
    { 
      id: 8, 
      title: '新能源车市场竞争加剧', 
      category: 'tech', 
      categoryName: '科技',
      trending: '+67%',
      hotIndex: 93,
      briefIntro: '多家车企发布新能源汽车新品，市场竞争格局将如何变化？',
      relatedKeywords: ['新能源汽车', '电动车', '汽车产业']
    }
  ]
  
  const filteredTopics = activeCategory === 'all' 
    ? hotTopics 
    : hotTopics.filter(topic => topic.category === activeCategory)
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-toutiao-red" />
          <h1 className="text-2xl font-bold">热点话题</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <select 
              className="pl-10 pr-4 py-2 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
              onChange={(e) => setActiveCategory(e.target.value)}
              value={activeCategory}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map(topic => (
          <div key={topic.id} className="overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {topic.categoryName}
                </span>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{topic.trending}</span>
                </div>
              </div>
              
              <h3 className="mb-2 text-lg font-bold text-gray-900">{topic.title}</h3>
              <p className="mb-4 text-gray-600">{topic.briefIntro}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {topic.relatedKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-md">
                    {keyword}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-500">热度指数:</span>
                  <div className="w-20 h-2 mx-2 overflow-hidden bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-toutiao-red" 
                      style={{ width: `${topic.hotIndex}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{topic.hotIndex}</span>
                </div>
                
                <Link 
                  to={`/create?topic=${encodeURIComponent(topic.title)}`}
                  className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-lg bg-toutiao-red hover:bg-red-600"
                >
                  <PenSquare className="w-4 h-4 mr-1" />
                  <span>创作</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotTopics
