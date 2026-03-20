import type { Metadata } from "next";
import { Manrope, Montserrat, Outfit } from "next/font/google";
import "../globals.css";
import Script from 'next/script';
import { GlobalHeader, GlobalFooter, GlobalMobileNav, GlobalCookieBanner, ConsultationButton } from '@/components/GlobalElements';
import { LanguageProvider } from '@/context/LanguageContext';

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat", weight: ["400", "500", "600", "700", "800"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["700"] });

export const metadata: Metadata = {
  title: "MIGO — Работа, жильё и документы в РФ",
  description: "Помогаем гражданам СНГ легально работать и жить в России. Поддержка в Telegram 24/7.",
};

// Список доступных языков для генерации статических путей
export async function generateStaticParams() {
  return [
    { lang: 'ru' },
    { lang: 'kz' },
    { lang: 'kg' },
    { lang: 'uz' },
    { lang: 'tj' },
  ];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang || 'ru';

  return (
    <html lang={currentLang} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`https://migohelp.com/${currentLang}`} />
        <link rel="alternate" hrefLang="ru" href="https://migohelp.com/ru" />
        <link rel="alternate" hrefLang="kz" href="https://migohelp.com/kz" />
        <link rel="alternate" hrefLang="kg" href="https://migohelp.com/kg" />
        <link rel="alternate" hrefLang="uz" href="https://migohelp.com/uz" />
        <link rel="alternate" hrefLang="tj" href="https://migohelp.com/tj" />
        <link rel="alternate" hrefLang="x-default" href="https://migohelp.com/ru" />
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {process.env.NEXT_PUBLIC_YM_ID && (
          <Script
            id="yandex-metrica"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                 (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                 m[i].l=1*new Date();
                 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                 ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                 });
               `,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MIGO",
              "url": "https://migohelp.com",
              "logo": "https://migohelp.com/logo.webp",
              "description": "Экосистема сервисов для трудовых мигрантов в РФ: работа, жилье, документы.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Армянский пер, д.9 стр. 1",
                "addressLocality": "Москва",
                "postalCode": "101000",
                "addressCountry": "RU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-921-854-39-09",
                "contactType": "customer support"
              }
            })
          }}
        />
      </head>
      <body className={`${manrope.variable} ${montserrat.variable} ${outfit.variable} bg-[#F0F7FC] text-[#163A5C] selection:bg-[#2196D3] selection:text-white`} suppressHydrationWarning style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
        <LanguageProvider initialLanguage={currentLang.toUpperCase() as any}>
          <GlobalHeader />
          <ConsultationButton />
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              {children}
            </div>
            <GlobalFooter />
          </div>
          <GlobalMobileNav />
          <GlobalCookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
