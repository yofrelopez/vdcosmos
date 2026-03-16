'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryUploadProps {
  onUploadSuccess?: (url: string) => void;
  currentImageUrl?: string;
  folder?: string;
  name?: string;
}

export default function CloudinaryUpload({ onUploadSuccess, currentImageUrl, folder, name }: CloudinaryUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const [fileSize, setFileSize] = useState<number | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={previewUrl} />}
      
      <div className="flex items-center gap-4">
        {previewUrl && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={previewUrl} 
              alt="Vista previa" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CldUploadWidget 
          uploadPreset="cosmos_services" 
          options={{
            folder: folder || 'vd-cosmos/servicios',
            multiple: false,
            resourceType: 'image',
            clientAllowedFormats: ['webp', 'png', 'jpg', 'jpeg'],
            maxImageWidth: 1600,
            cropping: true,
            croppingAspectRatio: 1,
            showSkipCropButton: true,
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#90A0B3',
                tabIcon: '#1a237e',
                menuIcons: '#5A616A',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#1a237e',
                action: '#1a237e',
                inactiveTabIcon: '#0E2F5A',
                error: '#F44235',
                inProgress: '#0078FF',
                complete: '#20B832',
                sourceBg: '#E4EBF1'
              }
            }
          }}
          onSuccess={(result: any) => {
            if (result.info && typeof result.info !== 'string') {
              const url = result.info.secure_url;
              const bytes = result.info.bytes;
              setPreviewUrl(url);
              setFileSize(bytes);
              onUploadSuccess?.(url);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex-1 px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-cosmos-blue hover:text-cosmos-blue transition-all font-medium text-sm flex flex-col items-center justify-center"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{previewUrl ? 'Cambiar Imagen' : 'Subir Imagen'}</span>
            </button>
          )}
        </CldUploadWidget>
      </div>
      <div className="flex justify-between items-center text-[10px] text-gray-400">
        <p>Archivos permitidos: JPG, PNG, WEBP. Tamaño máx: 5MB.</p>
        {fileSize && (
          <p className="text-cosmos-blue font-bold px-2 py-1 bg-cosmos-blue/5 rounded">
            Optimizado: {formatFileSize(fileSize)}
          </p>
        )}
      </div>
    </div>
  );
}
