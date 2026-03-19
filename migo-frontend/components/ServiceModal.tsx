"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import { T, useLanguage } from '@/context/LanguageContext';

const COLORS = {
  navy: '#163A5C',
  blue: '#2196D3',
};

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    icon: React.ReactNode;
    color: string;
  } | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    citizenship: '',
    city: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSuccess(false);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const searchParams = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead_type: 'service',
          name: formData.name,
          phone: formData.phone,
          citizenship: formData.citizenship,
          city: formData.city,
          comment: `${t('service_modal.comment_prefix', 'Заявка на услугу: ')}${service?.title}`,
          consent_given: true,
          ...utms
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', citizenship: '', city: '' });
        setTimeout(() => onClose(), 2500);
      } else {
        alert(t('service_modal.alert_error', 'Ошибка при отправке.'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('service_modal.alert_server_error', 'Не удалось связаться с сервером.'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#163A5C]/30 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
              {service.icon}
            </div>
            <h2 className="text-lg font-semibold" style={{ color: COLORS.navy }}>{service.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: `${COLORS.blue}15`, color: COLORS.blue }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.navy }}><T path="service_modal.success_title">Спасибо!</T></h3>
              <p className="text-gray-400 text-sm leading-relaxed"><T path="service_modal.success_desc">Ваша заявка успешно отправлена. Наш специалист скоро свяжется с вами.</T></p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed"><T path="service_modal.form_desc">Оставьте свои данные, и наш специалист свяжется with вами для оформления услуги.</T></p>

              <form className="space-y-3.5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-400 uppercase tracking-wide"><T path="service_modal.label_name">Имя</T></label>
                  <input
                    type="text"
                    required
                    placeholder={t('service_modal.placeholder_name', 'Как к вам обращаться?')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white outline-none transition-all focus:ring-2 focus:ring-[#2196D3]/40 focus:border-[#2196D3]/40 text-[#163A5C] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 text-gray-400 uppercase tracking-wide"><T path="service_modal.label_phone">Телефон</T></label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white outline-none transition-all focus:ring-2 focus:ring-[#2196D3]/40 focus:border-[#2196D3]/40 text-[#163A5C] text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-gray-400 uppercase tracking-wide"><T path="service_modal.label_citizenship">Гражданство</T></label>
                    <input
                      type="text"
                      required
                      placeholder={t('service_modal.placeholder_citizenship', 'Напр., РФ')}
                      value={formData.citizenship}
                      onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white outline-none transition-all focus:ring-2 focus:ring-[#2196D3]/40 focus:border-[#2196D3]/40 text-[#163A5C] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-gray-400 uppercase tracking-wide"><T path="service_modal.label_city">Ваш город</T></label>
                    <input
                      type="text"
                      required
                      placeholder={t('service_modal.placeholder_city', 'Где вы?')}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white outline-none transition-all focus:ring-2 focus:ring-[#2196D3]/40 focus:border-[#2196D3]/40 text-[#163A5C] text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-start gap-3">
                  <input type="checkbox" id="consent" required className="cursor-pointer mt-0.5 w-4 h-4 rounded border-gray-200 text-[#2196D3] focus:ring-[#2196D3]" />
                  <label htmlFor="consent" className="text-xs text-gray-400 leading-relaxed">
                    <T path="service_modal.consent_1">Я даю согласие на </T><Link href="#" className="text-[#2196D3] cursor-pointer"><T path="service_modal.consent_link">обработку персональных данных</T></Link><T path="service_modal.consent_2"> и принимаю условия.</T>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full mt-1 text-white p-4 rounded-xl font-semibold text-base hover:opacity-90 transition-all flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
                  style={{ backgroundColor: COLORS.navy }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <T path="service_modal.submit_btn">Оставить заявку</T>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}