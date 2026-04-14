'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Maximize2 } from 'lucide-react';

interface CatalogItem {
  id: string;
  model_name: string;
  description: string;
  technical_specs: Record<string, string>;
  image_url: string;
}

export default function CatalogItemClient({ item }: { item: CatalogItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div 
          className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-200 cursor-zoom-in"
          onClick={() => setIsOpen(true)}
        >
          {item.image_url ? (
            <CldImage
              src={item.image_url}
              alt={item.model_name}
              fill
              crop="fill"
              gravity="auto"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <img
              src="/images/placeholder-service.svg"
              alt={item.model_name}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Overlay Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Maximize2 className="w-5 h-5 text-cosmos-blue" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 md:w-3/5">
          <h3 className="text-2xl font-heading font-bold text-cosmos-blue mb-3">{item.model_name}</h3>
          <p className="text-gray-600 font-body mb-6">{item.description}</p>

          {/* Specs Table */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-heading font-bold text-gray-400 uppercase tracking-wider mb-3">Ficha Técnica</h4>
            <dl className="space-y-2">
              {item.technical_specs && Object.entries(item.technical_specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm border-b border-gray-200 pb-1">
                  <dt className="font-heading font-semibold text-gray-700 capitalize">{key}:</dt>
                  <dd className="text-gray-600 text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Zoom, Captions]}
        slides={[{ 
          src: item.image_url, 
          title: item.model_name, 
          description: item.description 
        }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
