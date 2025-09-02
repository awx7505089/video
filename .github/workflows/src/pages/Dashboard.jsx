import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, FileText, Award, PenSquare, ArrowRight, BarChart3 } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { title: '发布文章', value: '12', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { title: '热点话题', value: '28', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
    { title: '总阅读量', value: '3,842', icon: BarChart3, color: 'bg-green-100 text-green-600' },
    { title: '获得点赞', value: '156', icon: Award, color: 'bg-purple-100 text-purple-600' },
  ]

  const recentArticles = [
    { id: 1, title: '5G技术将如何改变我们的生活？', views: 1240, likes: 45, date: '2023-11-20' },
    { id: 2, title: '最新研究显示：每天喝咖啡有助于延长寿命', views: 980, likes: 32, date: '2023-11-18' },
    { id: 3, title: '年轻人买房还是租房？专家给出这样的建议', views: 1560, likes: 67, date: '2023-11-15' },
  ]

  const hotTopics = [
    { id: 1, title: '国内疫情最新进展', category: '社会', trending: '+24%' },
    { id: 2, title: '世界杯最新战况', category: '体育', trending: '+56%' },
    { id: 3, title: '年度最受欢迎电影榜单', category: '娱乐', trending: '+18%' },
    { id: 4, title: '科技巨头最新财报解读', category: '财经', trending: '+32%' },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">控制台</h1>
        <Link to="/create" className="flex items-center px-4 py-2 text-white bg-toutiao-red rounded-lg hover:bg-red-600">
          <PenSquare className="w-5 h-5 mr-2" />
          <span>创建文章</span>
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 最近文章 */}
        <div className="col-span-2 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">最近发布的文章</h2>
            <Link to="/articles" className="flex items-center text-sm text-toutiao-red hover:underline">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">标题</th>
                  <th className="pb-3 font-medium">阅读量</th>
                  <th className="pb-3 font-medium">点赞</th>
                  <th className="pb-3 font-medium">发布日期</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map(article => (
                  <tr key={article.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 pr-4">
                      <Link to={`/preview/${article.id}`} className="font-medium text-gray-900 hover:text-toutiao-red">
                        {article.title}
                      </Link>
                    </td>
                    <td className="py-4">{article.views}</td>
                    <td className="py-4">{article.likes}</td>
                    <td className="py-4">{article.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 热门话题 */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">热门话题</h2>
            <Link to="/hot-topics" className="flex items-center text-sm text-toutiao-red hover:underline">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <ul className="space-y-4">
            {hotTopics.map(topic => (
              <li key={topic.id} className="p-4 transition-all bg-gray-50 rounded-lg hover:shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-1 text-xs bg-gray-200 rounded">{topic.category}</span>
                  <span className="text-sm font-medium text-green-600">{topic.trending}</span>
                </div>
                <Link to={`/create?topic=${encodeURIComponent(topic.title)}`} className="block mt-1 font-medium hover:text-toutiao-red">
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
