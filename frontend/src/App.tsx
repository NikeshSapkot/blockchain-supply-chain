import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';
import SupplyChainChart from './components/SupplyChainChart';
import ThemeToggle from './components/ThemeToggle';
import SettingsModal from './components/SettingsModal';
import ProductModal from './components/ProductModal';
import { 
  Link, 
  Package, 
  Clock, 
  CheckCircle, 
  Eye,
  Plus,
  Search,
  Filter,
  QrCode,
  Shield,
  Globe,
  Activity,
  Settings,
  Bell,
  Wallet,
  Hash,
  Lock,
  Play,
  Pause
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  location: string;
  status: 'manufacturing' | 'shipping' | 'warehouse' | 'retail' | 'delivered';
  timestamp: string;
  verified: boolean;
  temperature?: number;
  humidity?: number;
  blockchainHash?: string;
  gasUsed?: number;
  blockNumber?: number;
}

interface SupplyChainEvent {
  id: number;
  productId: string;
  event: string;
  location: string;
  timestamp: string;
  verified: boolean;
  blockchainHash?: string;
  gasUsed?: number;
}

interface BlockchainStats {
  totalBlocks: number;
  totalTransactions: number;
  averageGasPrice: number;
  networkStatus: 'connected' | 'disconnected' | 'syncing';
  lastBlockTime: string;
}

interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface AppSettings {
  notifications: boolean;
  realTimeUpdates: boolean;
  autoRefresh: boolean;
  blockchainNetwork: string;
  updateInterval: number;
  dataRetention: number;
  securityLevel: string;
  language: string;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PROD-001',
      name: 'Organic Coffee Beans',
      manufacturer: 'Green Valley Farms',
      location: 'Warehouse A, Zone 3',
      status: 'warehouse',
      timestamp: '2024-01-15 14:30:00',
      verified: true,
      temperature: 22,
      humidity: 65,
      blockchainHash: '0x1234567890abcdef...',
      gasUsed: 21000,
      blockNumber: 18475632
    },
    {
      id: 'PROD-002',
      name: 'Premium Electronics',
      manufacturer: 'TechCorp Industries',
      location: 'In Transit - Shipment #TC-789',
      status: 'shipping',
      timestamp: '2024-01-15 12:15:00',
      verified: true,
      blockchainHash: '0xabcdef1234567890...',
      gasUsed: 45000,
      blockNumber: 18475630
    },
    {
      id: 'PROD-003',
      name: 'Handcrafted Furniture',
      manufacturer: 'Artisan Woodworks',
      location: 'Manufacturing Facility',
      status: 'manufacturing',
      timestamp: '2024-01-15 10:45:00',
      verified: false
    }
  ]);

  const [events] = useState<SupplyChainEvent[]>([
    {
      id: 1,
      productId: 'PROD-001',
      event: 'Product manufactured',
      location: 'Green Valley Farms, Costa Rica',
      timestamp: '2024-01-10 09:00:00',
      verified: true,
      blockchainHash: '0x1111111111111111...',
      gasUsed: 21000
    },
    {
      id: 2,
      productId: 'PROD-001',
      event: 'Quality check completed',
      location: 'Quality Lab, Costa Rica',
      timestamp: '2024-01-12 15:30:00',
      verified: true,
      blockchainHash: '0x2222222222222222...',
      gasUsed: 18000
    },
    {
      id: 3,
      productId: 'PROD-001',
      event: 'Shipped to warehouse',
      location: 'Port of San Jose',
      timestamp: '2024-01-13 08:00:00',
      verified: true,
      blockchainHash: '0x3333333333333333...',
      gasUsed: 25000
    },
    {
      id: 4,
      productId: 'PROD-001',
      event: 'Arrived at warehouse',
      location: 'Warehouse A, Zone 3',
      timestamp: '2024-01-15 14:30:00',
      verified: true,
      blockchainHash: '0x4444444444444444...',
      gasUsed: 22000
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    realTimeUpdates: true,
    autoRefresh: true,
    blockchainNetwork: 'ethereum',
    updateInterval: 4,
    dataRetention: 30,
    securityLevel: 'medium',
    language: 'en',
  });
  const [blockchainStats, setBlockchainStats] = useState<BlockchainStats>({
    totalBlocks: 18475632,
    totalTransactions: 456789,
    averageGasPrice: 25.5,
    networkStatus: 'connected',
    lastBlockTime: '2024-01-15 15:30:00'
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Apply dark theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Enhanced real-time updates with more dynamic data
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      // Simulate new blocks with more realistic data
      setBlockchainStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + Math.floor(Math.random() * 3) + 1,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50) + 10,
        averageGasPrice: prev.averageGasPrice + (Math.random() - 0.5) * 2,
        lastBlockTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }));

      // Enhanced status updates with more realistic transitions
      setProducts(prev => prev.map(product => {
        const random = Math.random();
        
        if (product.status === 'manufacturing' && random < 0.08) {
          const updatedProduct = {
            ...product,
            status: 'shipping' as const,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            location: 'In Transit - Shipment #' + Math.random().toString(36).substr(2, 8).toUpperCase(),
            blockchainHash: '0x' + Math.random().toString(16).substr(2, 40) + '...',
            gasUsed: Math.floor(Math.random() * 30000) + 15000,
            blockNumber: blockchainStats.totalBlocks + 1
          };
          
          // Add notification for status change
          const notification: NotificationItem = {
            id: Date.now().toString(),
            type: 'info',
            title: 'Product Status Updated',
            message: `${product.name} (${product.id}) is now in shipping.`
          };
          setNotifications(prev => [...prev, notification]);
          
          return updatedProduct;
        }
        if (product.status === 'shipping' && random < 0.06) {
          const updatedProduct = {
            ...product,
            status: 'warehouse' as const,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            location: 'Warehouse ' + String.fromCharCode(65 + Math.floor(Math.random() * 5)) + ', Zone ' + (Math.floor(Math.random() * 5) + 1),
            temperature: Math.floor(Math.random() * 10) + 18,
            humidity: Math.floor(Math.random() * 20) + 60,
            verified: true
          };
          
          // Add notification for status change
          const notification: NotificationItem = {
            id: Date.now().toString(),
            type: 'success',
            title: 'Product Arrived at Warehouse',
            message: `${product.name} (${product.id}) has arrived at ${updatedProduct.location}.`
          };
          setNotifications(prev => [...prev, notification]);
          
          return updatedProduct;
        }
        if (product.status === 'warehouse' && random < 0.04) {
          return {
            ...product,
            status: 'retail' as const,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            location: 'Retail Store #' + (Math.floor(Math.random() * 100) + 1),
            verified: true
          };
        }
        if (product.status === 'retail' && random < 0.03) {
          return {
            ...product,
            status: 'delivered' as const,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            location: 'Delivered to Customer',
            verified: true
          };
        }
        return product;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled, blockchainStats.totalBlocks]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'manufacturing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipping': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warehouse': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'retail': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'manufacturing': return '🏭';
      case 'shipping': return '🚢';
      case 'warehouse': return '📦';
      case 'retail': return '🏪';
      case 'delivered': return '✅';
      default: return '📋';
    }
  };

  const addNewProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const saveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      const notification: NotificationItem = {
        id: Date.now().toString(),
        type: 'success',
        title: 'Product Updated',
        message: `Product ${product.name} has been updated successfully.`
      };
      setNotifications(prev => [...prev, notification]);
    } else {
      // Add new product
      setProducts(prev => [...prev, product]);
      const notification: NotificationItem = {
        id: Date.now().toString(),
        type: 'success',
        title: 'Product Added',
        message: `New product ${product.name} has been added to the supply chain.`
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    setIsRealTimeEnabled(newSettings.realTimeUpdates);
    
    const notification: NotificationItem = {
      id: Date.now().toString(),
      type: 'success',
      title: 'Settings Updated',
      message: 'Your settings have been saved successfully.'
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Chart data for supply chain analytics
  const chartData = [
    { label: 'Manufacturing', value: products.filter(p => p.status === 'manufacturing').length, color: 'bg-yellow-500' },
    { label: 'Shipping', value: products.filter(p => p.status === 'shipping').length, color: 'bg-blue-500' },
    { label: 'Warehouse', value: products.filter(p => p.status === 'warehouse').length, color: 'bg-purple-500' },
    { label: 'Retail', value: products.filter(p => p.status === 'retail').length, color: 'bg-green-500' },
    { label: 'Delivered', value: products.filter(p => p.status === 'delivered').length, color: 'bg-gray-500' },
  ];



  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getNetworkStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'disconnected': return 'text-red-500';
      case 'syncing': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <AnimatedBackground />
      
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Blockchain Supply Chain Tracker</h1>
                <p className="text-blue-100 text-sm">Decentralized • Transparent • Secure</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getNetworkStatusColor(blockchainStats.networkStatus)}`}></div>
                <span className="text-sm">{blockchainStats.networkStatus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Connected</span>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</p>
                <p className="text-green-600 dark:text-green-400 text-sm">+2 this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Tracking</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.filter(p => p.status !== 'delivered').length}</p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">Real-time updates</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verified Products</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.filter(p => p.verified).length}</p>
                <p className="text-purple-600 dark:text-purple-400 text-sm">Blockchain verified</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Global Locations</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                <p className="text-orange-600 dark:text-orange-400 text-sm">5 countries</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Blockchain Stats */}
        <motion.div 
          className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Blockchain Network</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                  isRealTimeEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isRealTimeEnabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                <span>{isRealTimeEnabled ? 'Live' : 'Paused'}</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Blocks</p>
              <p className="text-2xl font-bold text-green-400">{blockchainStats.totalBlocks.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Transactions</p>
              <p className="text-2xl font-bold text-blue-400">{blockchainStats.totalTransactions.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Gas Price</p>
              <p className="text-2xl font-bold text-yellow-400">{blockchainStats.averageGasPrice} Gwei</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Last Block</p>
              <p className="text-lg font-bold text-purple-400">{blockchainStats.lastBlockTime}</p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Charts */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SupplyChainChart 
            data={chartData}
            title="Supply Chain Status Distribution"
          />
          <SupplyChainChart 
            data={[
              { label: 'Verified Products', value: products.filter(p => p.verified).length, color: 'bg-green-500' },
              { label: 'Unverified Products', value: products.filter(p => !p.verified).length, color: 'bg-red-500' },
            ]}
            title="Product Verification Status"
          />
        </motion.div>

        {/* Search and Controls */}
        <motion.div 
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by ID, name, or manufacturer..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="shipping">Shipping</option>
            <option value="warehouse">Warehouse</option>
            <option value="retail">Retail</option>
            <option value="delivered">Delivered</option>
          </select>
          <button
            onClick={addNewProduct}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products List */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tracked Products</h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">{filteredProducts.length} products</span>
              </div>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedProduct?.id === product.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedProduct(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                          {product.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {product.blockchainHash && <Hash className="w-3 h-3 text-blue-500" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ID: {product.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Manufacturer: {product.manufacturer}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                            {getStatusIcon(product.status)} {product.status}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{product.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <QrCode className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                        <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editProduct(product);
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Product Details</h2>
            {selectedProduct ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{selectedProduct.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Product ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedProduct.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Manufacturer</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedProduct.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Current Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedProduct.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProduct.status)}`}>
                        {getStatusIcon(selectedProduct.status)} {selectedProduct.status}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedProduct.temperature && selectedProduct.humidity && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Environmental Data</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-600 dark:text-blue-400">Temperature</p>
                        <p className="text-lg font-semibold text-blue-900 dark:text-blue-300">{selectedProduct.temperature}°C</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-600 dark:text-green-400">Humidity</p>
                        <p className="text-lg font-semibold text-green-900 dark:text-green-300">{selectedProduct.humidity}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProduct.blockchainHash && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Blockchain Data</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Transaction Hash:</span>
                          <span className="font-mono text-blue-600 dark:text-blue-400">{selectedProduct.blockchainHash}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Gas Used:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedProduct.gasUsed?.toLocaleString()} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Block Number:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedProduct.blockNumber?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Supply Chain Events</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {events
                      .filter(event => event.productId === selectedProduct.id)
                      .map((event) => (
                        <motion.div
                          key={event.id}
                          className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            event.verified ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{event.event}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.location}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{event.timestamp}</p>
                            {event.blockchainHash && (
                              <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">{event.blockchainHash}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {event.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {event.blockchainHash && <Hash className="w-3 h-3 text-blue-500" />}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                    Update Status
                  </button>
                  <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    View on Blockchain
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Select a product to view details</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Enhanced Blockchain Verification */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Blockchain Verification</h2>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400">All records verified</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="text-center p-4 bg-green-900/50 rounded-lg border border-green-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-green-400">Immutable Records</h3>
              <p className="text-sm text-green-300">All data is cryptographically secured</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-blue-900/50 rounded-lg border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-400">Transparent Tracking</h3>
              <p className="text-sm text-blue-300">Complete visibility across the supply chain</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-purple-900/50 rounded-lg border border-purple-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-400">Real-time Updates</h3>
              <p className="text-sm text-purple-300">Instant verification of all transactions</p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2024 Blockchain Supply Chain Tracker. Built with ❤️ by Nikesh Sapkot</p>
          <p className="text-sm text-gray-500 mt-2">Revolutionizing supply chains with blockchain technology</p>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
        onSave={saveProduct}
      />
    </div>
  );
};

export default App;
