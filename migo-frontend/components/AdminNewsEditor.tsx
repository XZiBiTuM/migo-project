"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface AdminNewsEditorProps {
  slug?: string;
}

export default function AdminNewsEditor({ slug: initialSlug }: AdminNewsEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!initialSlug);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState(initialSlug || '');
  const [category, setCategory] = useState('important');
  const [language, setLanguage] = useState('ru');
  const [lead, setLead] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('published');
  
  // New Fields
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showQuestionBtn, setShowQuestionBtn] = useState(false);
  const [showConsultBtn, setShowConsultBtn] = useState(false);
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16));
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/admin');
      return;
    }
    setIsAuth(true);

    if (initialSlug) {
      fetchNewsData(initialSlug);
    }
  }, [initialSlug, router]);

  const fetchNewsData = async (s: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${s}/`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setCategory(data.category || 'important');
        setLanguage(data.language || 'ru');
        setLead(data.lead || '');
        setContent(data.content || '');
        setStatus(data.status || 'published');
        setCoverPreview(data.cover_image || null);
        setShowQuestionBtn(data.show_question_btn || false);
        setShowConsultBtn(data.show_consult_btn || false);
        setPublishedAt(data.published_at ? data.published_at.slice(0, 16) : new Date().toISOString().slice(0, 16));
        setMetaTitle(data.meta_title || '');
        setMetaDescription(data.meta_description || '');
      } else {
        setError('Не удалось загрузить данные новости');
      }
    } catch (err) {
      setError('Ошибка при загрузке новости');
    } finally {
      setFetching(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    const translitMap: Record<string, string> = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    if (!initialSlug) {
      setSlug(translateToSlug(newTitle));
    }

    function translateToSlug(str: string) {
      return str.toLowerCase().split('').map(char => translitMap[char] || char)
        .join('').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('category', category);
    formData.append('language', language);
    formData.append('lead', lead);
    formData.append('content', content);
    formData.append('status', status);
    formData.append('show_question_btn', String(showQuestionBtn));
    formData.append('show_consult_btn', String(showConsultBtn));
    formData.append('published_at', new Date(publishedAt).toISOString());
    formData.append('meta_title', metaTitle);
    formData.append('meta_description', metaDescription);
    
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    const token = localStorage.getItem('access_token');
    const url = initialSlug
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${initialSlug}/`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/news/`;

    const method = initialSlug ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess(initialSlug ? 'Новость успешно обновлена!' : 'Новость успешно создана!');
        setTimeout(() => {
          router.push('/admin/news');
        }, 1500);
      } else {
        const errData = await res.json();
        setError(`Ошибка: ${JSON.stringify(errData)}`);
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth || fetching) return <div className="min-h-screen bg-[#F0F7FC] flex items-center justify-center font-bold text-[#163A5C]">Загрузка...</div>;

  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/news" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#163A5C] shadow-sm hover:shadow-md transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold text-[#163A5C]">{initialSlug ? 'Редактировать новость' : 'Создать новость'}</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-red-100 shadow-sm">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-green-100 shadow-sm">
          <CheckCircle2 size={20} /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-[#163A5C] mb-2">Заголовок новости *</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-semibold text-lg"
              placeholder="Введите заголовок"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#163A5C] mb-2">Категория *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-medium appearance-none bg-white cursor-pointer"
            >
              <option value="important">Важное</option>
              <option value="documents">Документы</option>
              <option value="work">Работа</option>
              <option value="housing">Жильё</option>
              <option value="laws">Законы</option>
              <option value="stories">Истории</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#163A5C] mb-2">Язык *</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-medium appearance-none bg-white cursor-pointer"
            >
              <option value="ru">Русский</option>
              <option value="uz">O‘zbekcha</option>
              <option value="tg">Тоҷикӣ</option>
              <option value="kg">Кыргызча</option>
              <option value="kz">Қазақша</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-[#163A5C] mb-2">ЧПУ (URL Slug) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              readOnly={!!initialSlug}
              className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#2196D3] transition-all outline-none font-mono text-sm ${initialSlug ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-500'}`}
            />
            {initialSlug && <p className="text-xs text-gray-400 mt-1">Slug нельзя изменить у существующей новости во избежание битых ссылок.</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-[#163A5C] mb-2">Анонс (Короткое описание на карточке)</label>
            <textarea
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] focus:ring-2 focus:ring-[#2196D3]/20 transition-all outline-none text-[#163A5C] font-medium resize-none"
              placeholder="Кратко о чем эта новость..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-[#163A5C] mb-2">Текст новости *</label>
            <div className="bg-white rounded-xl border border-gray-200 focus-within:border-[#2196D3] focus-within:ring-2 focus-within:ring-[#2196D3]/20 transition-all overflow-hidden flex flex-col [&_.ql-toolbar.ql-snow]:border-none [&_.ql-toolbar.ql-snow]:border-b [&_.ql-toolbar.ql-snow]:border-gray-100 [&_.ql-toolbar.ql-snow]:p-3 [&_.ql-container.ql-snow]:border-none [&_.ql-container.ql-snow]:h-[400px] [&_.ql-editor]:p-5 [&_.ql-editor]:text-base [&_.ql-editor]:leading-relaxed [&_.ql-editor.ql-blank::before]:left-5">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="Начните писать вашу новость здесь..."
              />
            </div>
          </div>

          {/* New Sections */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
             <div>
                <h3 className="text-lg font-bold text-[#163A5C] mb-4">Настройки отображения</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="q_btn" 
                      checked={showQuestionBtn} 
                      onChange={(e) => setShowQuestionBtn(e.target.checked)}
                      className="w-5 h-5 accent-[#2196D3]"
                    />
                    <label htmlFor="q_btn" className="text-sm font-semibold text-[#163A5C] cursor-pointer">Кнопка "Задать вопрос в Telegram"</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="c_btn" 
                      checked={showConsultBtn} 
                      onChange={(e) => setShowConsultBtn(e.target.checked)}
                      className="w-5 h-5 accent-[#2196D3]"
                    />
                    <label htmlFor="c_btn" className="text-sm font-semibold text-[#163A5C] cursor-pointer">Кнопка "Получить консультацию"</label>
                  </div>
                  
                  <div className="pt-4">
                    <label className="block text-sm font-bold text-[#163A5C] mb-2">Дата публикации</label>
                    <input 
                      type="datetime-local" 
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2196D3] outline-none"
                    />
                  </div>
                </div>
             </div>

             <div>
                <h3 className="text-lg font-bold text-[#163A5C] mb-4">Обложка новости</h3>
                <div className="relative group">
                   {coverPreview ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                         <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                         <button 
                           type="button"
                           onClick={() => { setCoverImage(null); setCoverPreview(null); }}
                           className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           <AlertCircle size={16} />
                         </button>
                      </div>
                   ) : (
                      <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#2196D3] hover:bg-[#F0F7FC] transition-all cursor-pointer">
                         <Save size={32} className="text-gray-300 mb-2" />
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Загрузить фото</span>
                         <input 
                           type="file" 
                           accept="image/*" 
                           className="hidden" 
                           onChange={(e) => {
                             const file = e.target.files?.[0];
                             if (file) {
                               setCoverImage(file);
                               setCoverPreview(URL.createObjectURL(file));
                             }
                           }}
                         />
                      </label>
                   )}
                </div>
             </div>
          </div>

          <div className="md:col-span-2 pt-8 border-t border-gray-100">
             <h3 className="text-lg font-bold text-[#163A5C] mb-4">SEO Оптимизация</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#163A5C] mb-2">SEO Title</label>
                  <input 
                    type="text" 
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Заголовок для поисковиков..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#163A5C] mb-2">SEO Description</label>
                  <textarea 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Описание для поисковиков..."
                    rows={1}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2196D3] outline-none font-medium resize-none"
                  />
                </div>
             </div>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-1">Статус публикации</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-[#163A5C] font-semibold bg-gray-50 outline-none cursor-pointer"
              >
                <option value="draft">Черновик</option>
                <option value="review">На проверке</option>
                <option value="published">Опубликовано</option>
                <option value="archive">Архив</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !content || !title}
              className="w-full sm:w-auto bg-[#B8D430] hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : <><Save size={20} /> {initialSlug ? 'Сохранить изменения' : 'Создать новость'}</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
