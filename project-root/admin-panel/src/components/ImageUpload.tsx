import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const ImageUpload: React.FC<ImagePreviewProps> = ({ files, onRemove }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      {files.map((file, index) => (
        <div 
          key={index} 
          className="relative group animate-fadeIn"
        >
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg transform transition-transform duration-200 group-hover:scale-105"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;