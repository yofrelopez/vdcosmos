'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Maximize2, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

import { Project, projectsConfig } from '@/config/projects';

const categories = ['Todos', 'Vidriería', 'Aluminio', 'Melamina', 'Decoración'];

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtrar proyectos según categoría seleccionada
  const filteredProjects = selectedCategory === 'Todos'
    ? projectsConfig
    : projectsConfig.filter(p => p.category === selectedCategory);

  // Formatear imágenes para el Lightbox
  const lightboxSlides = filteredProjects.map(p => ({
    src: p.image,
    title: p.title,
    description: p.description
  }));

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filtros de Categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer ${
                category === selectedCategory
                  ? 'bg-cosmos-blue text-white shadow-md hover:bg-cosmos-blue-dark scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-cosmos-blue/5 hover:text-cosmos-blue hover:border-cosmos-blue/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Proyectos */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Imagen del proyecto */}
                <div 
                  className="relative h-64 overflow-hidden bg-gray-100 cursor-zoom-in"
                  onClick={() => setLightboxIndex(index)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Badge de Categoría */}
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-white/90 backdrop-blur-xs text-xs font-heading font-bold text-cosmos-blue rounded-full shadow-xs">
                    {project.category}
                  </span>
                  
                  {/* Overlay en hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Maximize2 className="w-5 h-5 text-cosmos-blue" />
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Título */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-cosmos-blue transition-colors duration-200 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className={`text-gray-600 font-body text-sm leading-relaxed mb-2 transition-all duration-300 ${
                    expandedCards[project.id] ? '' : 'line-clamp-3'
                  }`}>
                    {project.description}
                  </p>
                  {project.description.length > 120 && (
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-cosmos-blue hover:text-cosmos-blue-dark font-heading text-xs font-semibold mb-4 text-left cursor-pointer transition-colors"
                    >
                      {expandedCards[project.id] ? 'Ver menos' : 'Leer más'}
                    </button>
                  )}

                  {/* Metadatos Rápidos (Ubicación/Año) */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-body mb-4 pb-4 border-b border-gray-100">
                    {project.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cosmos-red" />
                        {project.location}
                      </span>
                    )}
                    {project.year && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cosmos-blue" />
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Ficha Técnica Rápida (Especificaciones) */}
                  {project.specs && project.specs.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-heading font-bold text-gray-400 uppercase tracking-wider mb-2">Especificaciones</h4>
                      <ul className="grid grid-cols-1 gap-1.5">
                        {project.specs.slice(0, 3).map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 text-xs text-gray-600 font-body">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => setLightboxIndex(index)}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-heading text-xs font-semibold rounded-lg hover:bg-cosmos-blue hover:text-white transition-all duration-200 text-center cursor-pointer"
                    >
                      Ampliar Foto
                    </button>
                    <Link
                      href={`/cotizar?proyecto=${project.id}`}
                      className="flex-1 px-4 py-2.5 bg-cosmos-red text-white font-heading text-xs font-semibold rounded-lg hover:bg-cosmos-red-dark transition-all duration-200 text-center shadow-xs hover:shadow-md flex items-center justify-center gap-1"
                    >
                      Cotizar
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-body">No se encontraron proyectos en esta categoría.</p>
          </div>
        )}
        
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          plugins={[Zoom, Captions]}
          slides={lightboxSlides}
          captions={{
            descriptionTextAlign: 'center',
            descriptionMaxLines: 10
          }}
          render={{
            buttonPrev: lightboxSlides.length <= 1 ? () => null : undefined,
            buttonNext: lightboxSlides.length <= 1 ? () => null : undefined,
          }}
        />

        {/* Estilos inyectados de forma segura para hacer legible la descripción en el Lightbox */}
        <style dangerouslySetInnerHTML={{ __html: `
          .yarl__caption_container {
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.75) 60%, rgba(0, 0, 0, 0) 100%) !important;
            padding: 24px 24px 32px 24px !important;
          }
          .yarl__caption_title {
            font-family: var(--font-montserrat), sans-serif !important;
            font-size: 1.35rem !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-bottom: 8px !important;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.8) !important;
          }
          .yarl__caption_description {
            font-family: var(--font-opensans), sans-serif !important;
            font-size: 0.95rem !important;
            color: #f1f5f9 !important;
            line-height: 1.6 !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;
          }
        `}} />

      </div>
    </div>
  );
}
