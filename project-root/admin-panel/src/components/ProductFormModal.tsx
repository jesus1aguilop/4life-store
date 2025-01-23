import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import Modal from './Modal';
import ImageUpload from './ImageUpload';
import LoadingSpinner from './LoadingSpinner';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Guardando producto:', formData);
    console.log('Fotos:', photos);
    setIsLoading(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      const newFiles = Array.from(e.target.files);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPhotos(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Producto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            >
              <option value="">Seleccionar categoría</option>
              <option value="Electrónicos">Electrónicos</option>
              <option value="Ropa">Ropa</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div className="md:col-span-2 animate-slideIn" style={{ animationDelay: '0.5s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            />
          </div>

          <div className="md:col-span-2 animate-slideIn" style={{ animationDelay: '0.6s' }}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fotos del Producto
            </label>
            <div className="mt-1 flex items-center">
              <label className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isUploading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Subir Fotos
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                Puedes seleccionar múltiples fotos
              </span>
            </div>
            <ImageUpload files={photos} onRemove={removePhoto} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;