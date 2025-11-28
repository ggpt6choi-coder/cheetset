import { getDictionary } from "@/dictionaries/get-dictionary";

type Locale = "en" | "ko" | "ja";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          {dict.home.welcome}
        </h1>

        <p className="mt-3 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          {dict.home.intro}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mt-6 sm:w-full">
          <a
            href={`/${lang}/tools/word-counter`}
            className="p-6 text-left border w-full sm:w-[45%] rounded-xl hover:text-blue-600 focus:text-blue-600 dark:border-gray-700 dark:hover:text-blue-400 transition-colors"
          >
            <h3 className="text-2xl font-bold">{dict.tools.word_counter.title} &rarr;</h3>
            <p className="mt-4 text-xl">
              {dict.tools.word_counter.description}
            </p>
          </a>

          <a
            href={`/${lang}/tools/json-formatter`}
            className="p-6 text-left border w-full sm:w-[45%] rounded-xl hover:text-blue-600 focus:text-blue-600 dark:border-gray-700 dark:hover:text-blue-400 transition-colors"
          >
            <h3 className="text-2xl font-bold">{dict.tools.json_formatter.title} &rarr;</h3>
            <p className="mt-4 text-xl">
              {dict.tools.json_formatter.description}
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
