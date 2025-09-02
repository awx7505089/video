import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, PenSquare, TrendingUp, FileText, Settings, LogOut } from 'lucide-react'

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边导航 */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex items-center px-6 py-4 border-b">
          <div className="text-2xl font-bold text-toutiao-red">头条创作助手</div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
                end
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                <span>控制台</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/hot-topics" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                <span>热点话题</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/create" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                <PenSquare className="w-5 h-5 mr-3" />
                <span>创作文章</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/articles" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                <FileText className="w-5 h-5 mr-3" />
                <span>我的文章</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>设置</span>
              </NavLink>
            </li>
          </ul>
          
          <div className="pt-6 mt-6 border-t">
            <button className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100">
              <LogOut className="w-5 h-5 mr-3" />
              <span>退出登录</span>
            </button>
          </div>
        </nav>
      </aside>
      
      {/* 主内容区域 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
