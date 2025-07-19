import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, Bell, Shield, Globe, Activity, Database, Zap } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    notifications: boolean;
    realTimeUpdates: boolean;
    autoRefresh: boolean;
    blockchainNetwork: string;
    updateInterval: number;
    dataRetention: number;
    securityLevel: string;
    language: string;
  };
  onSettingsChange: (settings: any) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  const updateSetting = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Activity },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'blockchain', label: 'Blockchain', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'data', label: 'Data', icon: Database },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex h-[600px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <nav className="p-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'general' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Real-time Updates
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Enable live updates from blockchain network
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSettings.realTimeUpdates}
                                onChange={(e) => updateSetting('realTimeUpdates', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Auto Refresh
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Automatically refresh data periodically
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSettings.autoRefresh}
                                onChange={(e) => updateSetting('autoRefresh', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Language
                            </label>
                            <select
                              value={localSettings.language}
                              onChange={(e) => updateSetting('language', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="zh">Chinese</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enable Notifications
                              </label>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Show notifications for important events
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localSettings.notifications}
                                onChange={(e) => updateSetting('notifications', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Update Interval (seconds)
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="60"
                              value={localSettings.updateInterval}
                              onChange={(e) => updateSetting('updateInterval', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'blockchain' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Blockchain Settings</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Network
                            </label>
                            <select
                              value={localSettings.blockchainNetwork}
                              onChange={(e) => updateSetting('blockchainNetwork', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value="ethereum">Ethereum Mainnet</option>
                              <option value="polygon">Polygon</option>
                              <option value="bsc">Binance Smart Chain</option>
                              <option value="arbitrum">Arbitrum</option>
                              <option value="optimism">Optimism</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Security Level
                            </label>
                            <select
                              value={localSettings.securityLevel}
                              onChange={(e) => updateSetting('securityLevel', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            >
                              <option value="low">Low (Fast)</option>
                              <option value="medium">Medium (Balanced)</option>
                              <option value="high">High (Secure)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'performance' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Settings</h3>
                        
                        <div className="space-y-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Performance Tips</h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                              <li>• Reduce update interval for better performance</li>
                              <li>• Disable real-time updates on slow connections</li>
                              <li>• Use lower security levels for faster processing</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'data' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Management</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Data Retention (days)
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="365"
                              value={localSettings.dataRetention}
                              onChange={(e) => updateSetting('dataRetention', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div className="flex space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                              <Database className="w-4 h-4" />
                              <span>Clear Cache</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                              <RefreshCw className="w-4 h-4" />
                              <span>Reset Data</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal; 