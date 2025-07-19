import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Package, MapPin, Building, Thermometer, Droplets } from 'lucide-react';

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    manufacturer: '',
    location: '',
    status: 'manufacturing',
    temperature: 20,
    humidity: 60,
  });

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        manufacturer: '',
        location: '',
        status: 'manufacturing',
        temperature: 20,
        humidity: 60,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: product?.id || `PROD-${Date.now()}`,
      name: formData.name || '',
      manufacturer: formData.manufacturer || '',
      location: formData.location || '',
      status: formData.status || 'manufacturing',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      verified: false,
      temperature: formData.temperature,
      humidity: formData.humidity,
      blockchainHash: product?.blockchainHash,
      gasUsed: product?.gasUsed,
      blockNumber: product?.blockNumber,
    };

    onSave(newProduct);
    onClose();
  };

  const updateField = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEditing ? 'Update product information' : 'Create a new product for tracking'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Manufacturer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Manufacturer *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.manufacturer}
                      onChange={(e) => updateField('manufacturer', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter manufacturer name"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter current location"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="manufacturing">Manufacturing</option>
                    <option value="shipping">Shipping</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="retail">Retail</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Temperature (°C)
                  </label>
                  <div className="relative">
                    <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="-50"
                      max="100"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => updateField('temperature', parseFloat(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="20"
                    />
                  </div>
                </div>

                {/* Humidity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Humidity (%)
                  </label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={formData.humidity}
                      onChange={(e) => updateField('humidity', parseInt(e.target.value))}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="60"
                    />
                  </div>
                </div>
              </div>

              {/* Blockchain Info (Read-only for editing) */}
              {isEditing && product?.blockchainHash && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Blockchain Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Transaction Hash:</span>
                      <p className="font-mono text-blue-600 dark:text-blue-400 break-all">{product.blockchainHash}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Gas Used:</span>
                      <p className="font-medium">{product.gasUsed?.toLocaleString()} units</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Block Number:</span>
                      <p className="font-medium">{product.blockNumber?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Verified:</span>
                      <p className={`font-medium ${product.verified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {product.verified ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? 'Update Product' : 'Add Product'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal; 