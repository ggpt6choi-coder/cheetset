import { getDictionary } from "@/dictionaries/get-dictionary";
import { tools } from "@/config/tools";
import Link from "next/link";

type Locale = "en" | "ko" | "ja";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  console.log('Home Page Tools:', tools.map(t => t.slug));

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center justify-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          {dict.home.welcome}
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
          {dict.home.intro}
        </p>

        <div className="w-full max-w-6xl space-y-16">
          {['image', 'text', 'developer', 'finance', 'daily', 'health'].map((category) => {
            const categoryTools = tools.filter((t) => t.category === category);
            if (categoryTools.length === 0) return null;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const categoryTitle = (dict.home.categories as any)[category];

            return (
              <section key={category} className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200 border-b pb-4 border-gray-200 dark:border-gray-700">
                  {categoryTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryTools.map((tool) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const toolDict = (dict.tools as any)[tool.slug.replace(/-/g, '_')];

                    return (
                      <Link
                        key={tool.slug}
                        href={`/${lang}/tools/${tool.slug}`}
                        className="group flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {toolDict?.title || tool.slug}
                          </h3>
                          <span className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            &rarr;
                          </span>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-400 text-left line-clamp-2">
                          {toolDict?.description || ''}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
