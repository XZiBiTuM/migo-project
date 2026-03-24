import { T } from '@/context/LanguageContext';

export default function NewsHero() {
    return (
        <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden px-5 pt-32 pb-20 md:pt-0 md:pb-0">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B8D430]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#2196D3]/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,1)_100%)]"></div>
            </div>

            <div className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform`}>
                <div className="mt-12 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#163A5C] leading-[1.05] mb-8 max-w-5xl tracking-tight">
                        <T path="news.hero.title_1">Новости</T> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196D3] to-[#1E58B1]"><T path="news.hero.title_highlight">и полезные статьи</T></span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
                        <T path="news.hero.subtitle">Узнавайте первыми об изменениях в законах, новых вакансиях и лайфхаках для жизни в России.</T>
                    </p>
                </div>
            </div>
        </section>
    );
}