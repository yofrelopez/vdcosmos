'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, Loader2, MessageSquare, AlertCircle } from 'lucide-react';

// Esquema de validación Zod con reglas de negocio locales de Perú
const contactSchema = z.object({
  name: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo debe contener letras'),
  email: z.string()
    .min(1, 'El correo electrónico es requerido')
    .email('Ingresa una dirección de correo electrónico válida'),
  phone: z.string()
    .min(1, 'El número de teléfono es requerido')
    .regex(/^[9]\d{8}$/, 'El número celular debe tener 9 dígitos y comenzar con 9 (ej. 994260216)'),
  subject: z.string().min(1, 'Selecciona un asunto para tu consulta'),
  message: z.string()
    .min(10, 'El mensaje debe detallar tu consulta (mínimo 10 caracteres)')
    .max(500, 'El mensaje no debe exceder los 500 caracteres'),
  // Campo Honeypot invisible para protección contra spambots
  website: z.string().max(0).optional()
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'Consulta General',
      message: '',
      website: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Protección Honeypot: Si el bot rellenó este campo invisible, simular éxito pero descartar
    if (data.website) {
      setStatus('loading');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      return;
    }

    setStatus('loading');

    try {
      // Simular guardado / llamada API
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Generar mensaje formateado para redirección a WhatsApp (número principal: 994260216)
      const messageText = `Hola Vidriería Cosmos, soy *${data.name}* (Cel: ${data.phone}). Acabo de enviar el formulario de contacto web sobre *${data.subject}*.\n\n*Detalles de mi consulta:* ${data.message}`;
      const encodedText = encodeURIComponent(messageText);
      const url = `https://wa.me/51994260216?text=${encodedText}`;
      
      setWhatsappUrl(url);
      setStatus('success');
      reset();
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50/60 border border-green-200 rounded-2xl p-8 text-center shadow-xs flex flex-col items-center justify-center min-h-[420px] transition-all duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-500 animate-pulse" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">¡Mensaje Recibido!</h3>
        <p className="text-gray-600 font-body text-sm max-w-md mx-auto leading-relaxed mb-8">
          Tu consulta se procesó formalmente en nuestro sistema. Para agilizar la cotización o recibir una respuesta inmediata de nuestros asesores, puedes iniciar un chat directo en WhatsApp ahora mismo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-heading font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Iniciar Chat en WhatsApp
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-700 border border-gray-300 font-heading font-semibold text-sm rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            Volver al Formulario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-150 p-6 sm:p-8">
      <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
      <p className="text-sm text-gray-500 font-body mb-6">
        Completa el formulario formal de consulta y cotizaciones. Todos los campos marcados con * son requeridos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        
        {/* Campo Honeypot invisible para spambots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Sitio Web</label>
          <input
            type="text"
            id="website"
            {...register('website')}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Nombre completo */}
        <div>
          <label htmlFor="name" className="block text-xs font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            placeholder="Ej. Roberto López"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm font-body text-gray-800 placeholder-gray-400 ${
              errors.name 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/10' 
                : 'border-gray-250 focus:border-cosmos-blue focus:ring-2 focus:ring-cosmos-blue/20'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-body mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Dos campos en línea (Correo y Celular) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-xs font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm font-body text-gray-800 placeholder-gray-400 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/10' 
                  : 'border-gray-250 focus:border-cosmos-blue focus:ring-2 focus:ring-cosmos-blue/20'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-body mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Celular */}
          <div>
            <label htmlFor="phone" className="block text-xs font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">
              Teléfono Celular *
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Ej. 994260216"
              {...register('phone')}
              className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm font-body text-gray-800 placeholder-gray-400 ${
                errors.phone 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/10' 
                  : 'border-gray-250 focus:border-cosmos-blue focus:ring-2 focus:ring-cosmos-blue/20'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 font-body mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone.message}
              </p>
            )}
          </div>

        </div>

        {/* Asunto */}
        <div>
          <label htmlFor="subject" className="block text-xs font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">
            Asunto de tu Consulta *
          </label>
          <select
            id="subject"
            {...register('subject')}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm font-body text-gray-800 bg-white ${
              errors.subject 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                : 'border-gray-250 focus:border-cosmos-blue focus:ring-2 focus:ring-cosmos-blue/20'
            }`}
          >
            <option value="Consulta General">Consulta General</option>
            <option value="Cotización de Vidriería">Cotización de Vidriería / Mamparas</option>
            <option value="Cotización de Aluminio">Cotización de Ventanas / Puertas de Aluminio</option>
            <option value="Cotización de Melamina">Cotización de Muebles de Melamina</option>
            <option value="Servicio Técnico">Mantenimiento y Reparación</option>
          </select>
          {errors.subject && (
            <p className="text-xs text-red-500 font-body mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-xs font-heading font-bold text-gray-500 uppercase tracking-wider mb-2">
            Detalles de tu Mensaje *
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Escribe aquí los detalles de tu consulta o las medidas estimadas de tu proyecto..."
            {...register('message')}
            className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm font-body text-gray-800 placeholder-gray-400 resize-none ${
              errors.message 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/10' 
                : 'border-gray-250 focus:border-cosmos-blue focus:ring-2 focus:ring-cosmos-blue/20'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-xs text-red-500 font-body mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-cosmos-red hover:bg-cosmos-red-dark text-white font-heading font-semibold rounded-lg shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando de forma segura...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar Consulta
            </>
          )}
        </button>

        {status === 'error' && (
          <p className="text-xs text-red-500 font-body text-center mt-2 flex items-center justify-center gap-1 animate-pulse">
            <AlertCircle className="w-4 h-4" />
            Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.
          </p>
        )}
      </form>
    </div>
  );
}
