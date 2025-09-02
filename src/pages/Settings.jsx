import React, { useState } from 'react'
import { Save, RefreshCw, Settings as SettingsIcon, User, Bell, Shield, Key, HelpCircle } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [isSaving, setIsSaving] = useState(false)
  
  const [settings, setSettings] = useState({
    account: {
      username: 'content_creator',
      email: 'creator@example.com',
      bio: '热爱科技和生活的内容创作者'
    },
    notifications: {
      articlePublished: true,
      commentReceived: true,
      likeReceived: true,
      followReceived: false,
      emailNotifications: true,
      appNotifications: true
    },
    privacy: {
      profileVisibility: 'public',
      allowComments: true,
      showReadingHistory: false,
      allowTagging: true
    },
    api: {
      apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      secretKey: '••••••••••••••••••••••••••••••',
      callbackUrl: '',
      rateLimitPerMinute: 60
    }
  })
  
  const handleInputChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    })
  }
  
  const handleToggleChange = (section, field) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: !settings[section][field]
      }
    })
  }
  
  const handleSaveSettings = () => {
    setIsSaving(true)
    
    // 模拟API保存过程
    setTimeout(() => {
      setIsSaving(false)
      alert('设置已保存')
    }, 1000)
  }
  
  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">用户名</label>
        <input 
          type="text" 
          value={settings.account.username}
          onChange={(e) => handleInputChange('account', 'username', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">电子邮箱</label>
        <input 
          type="email" 
          value={settings.account.email}
          onChange={(e) => handleInputChange('account', 'email', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">个人简介</label>
        <textarea 
          value={settings.account.bio}
          onChange={(e) => handleInputChange('account', 'bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        ></textarea>
      </div>
    </div>
  )
  
  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="mb-4 text-lg font-medium">通知类型</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">文章发布通知</h4>
            <p className="text-sm text-gray-500">当您的文章成功发布时收到通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.articlePublished}
              onChange={() => handleToggleChange('notifications', 'articlePublished')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">评论通知</h4>
            <p className="text-sm text-gray-500">当有人评论您的文章时收到通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.commentReceived}
              onChange={() => handleToggleChange('notifications', 'commentReceived')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">点赞通知</h4>
            <p className="text-sm text-gray-500">当有人点赞您的文章时收到通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.likeReceived}
              onChange={() => handleToggleChange('notifications', 'likeReceived')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">关注通知</h4>
            <p className="text-sm text-gray-500">当有人关注您时收到通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.followReceived}
              onChange={() => handleToggleChange('notifications', 'followReceived')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
      </div>
      
      <h3 className="pt-4 mb-4 text-lg font-medium border-t">通知方式</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">邮件通知</h4>
            <p className="text-sm text-gray-500">通过邮件接收通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.emailNotifications}
              onChange={() => handleToggleChange('notifications', 'emailNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">应用内通知</h4>
            <p className="text-sm text-gray-500">在应用内接收通知</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.notifications.appNotifications}
              onChange={() => handleToggleChange('notifications', 'appNotifications')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
      </div>
    </div>
  )
  
  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">个人资料可见性</label>
        <select
          value={settings.privacy.profileVisibility}
          onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        >
          <option value="public">公开</option>
          <option value="followers">仅关注者可见</option>
          <option value="private">私密</option>
        </select>
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium">允许评论</h4>
            <p className="text-sm text-gray-500">允许他人评论您的文章</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.privacy.allowComments}
              onChange={() => handleToggleChange('privacy', 'allowComments')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium">显示阅读历史</h4>
            <p className="text-sm text-gray-500">让其他人看到您的阅读历史</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.privacy.showReadingHistory}
              onChange={() => handleToggleChange('privacy', 'showReadingHistory')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">允许标记</h4>
            <p className="text-sm text-gray-500">允许他人在文章中标记您</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={settings.privacy.allowTagging}
              onChange={() => handleToggleChange('privacy', 'allowTagging')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-toutiao-red"></div>
          </label>
        </div>
      </div>
    </div>
  )
  
  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="p-4 mb-4 text-sm border rounded-lg bg-blue-50 text-blue-800 border-blue-200">
        <p>API密钥允许您以编程方式访问今日头条创作平台，可用于自动发布文章和获取数据。</p>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">API密钥</label>
        <div className="flex">
          <input 
            type="text" 
            value={settings.api.apiKey}
            disabled
            className="flex-1 px-4 py-2 bg-gray-100 border rounded-l-lg"
          />
          <button className="px-4 py-2 font-medium text-white rounded-r-lg bg-toutiao-red">
            重新生成
          </button>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">API密钥密码</label>
        <div className="flex">
          <input 
            type="text" 
            value={settings.api.secretKey}
            disabled
            className="flex-1 px-4 py-2 bg-gray-100 border rounded-l-lg"
          />
          <button className="px-4 py-2 font-medium text-white rounded-r-lg bg-toutiao-red">
            重新生成
          </button>
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">回调URL（可选）</label>
        <input 
          type="text" 
          value={settings.api.callbackUrl}
          onChange={(e) => handleInputChange('api', 'callbackUrl', e.target.value)}
          placeholder="https://your-app.com/api/callback"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">API请求限制（每分钟）</label>
        <input 
          type="number" 
          value={settings.api.rateLimitPerMinute}
          onChange={(e) => handleInputChange('api', 'rateLimitPerMinute', parseInt(e.target.value))}
          min="10"
          max="120"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-toutiao-red focus:border-transparent"
        />
      </div>
    </div>
  )
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'privacy':
        return renderPrivacySettings()
      case 'api':
        return renderApiSettings()
      default:
        return renderAccountSettings()
    }
  }
  
  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-6 h-6 mr-3 text-toutiao-red" />
        <h1 className="text-2xl font-bold">设置</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* 侧边标签页 */}
        <div className="md:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <nav>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                      activeTab === 'account' 
                        ? 'bg-toutiao-red text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>账号设置</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                      activeTab === 'notifications' 
                        ? 'bg-toutiao-red text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Bell className="w-5 h-5 mr-3" />
                    <span>通知设置</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                      activeTab === 'privacy' 
                        ? 'bg-toutiao-red text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="w-5 h-5 mr-3" />
                    <span>隐私设置</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('api')}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg ${
                      activeTab === 'api' 
                        ? 'bg-toutiao-red text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Key className="w-5 h-5 mr-3" />
                    <span>API设置</span>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div className="pt-4 mt-6 border-t">
              <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 rounded-lg hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>帮助中心</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 主内容区 */}
        <div className="md:col-span-3">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            {renderTabContent()}
            
            <div className="flex justify-end pt-6 mt-8 border-t">
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center px-4 py-2 font-medium text-white rounded-lg bg-toutiao-red hover:bg-red-600 disabled:bg-gray-400"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    <span>保存设置</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
