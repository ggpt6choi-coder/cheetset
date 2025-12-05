import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

// Dynamic imports for blog posts
const JsonFormattingGuide = dynamic(() => import('@/components/blog/posts/JsonFormattingGuide'));
const CharacterEncodingGuide = dynamic(() => import('@/components/blog/posts/CharacterEncodingGuide'));
const ResumeWordCount = dynamic(() => import('@/components/blog/posts/ResumeWordCount'));
const ServerTimeTicketingGuide = dynamic(() => import('@/components/blog/posts/ServerTimeTicketingGuide'));
const ProductivityToolsGuide = dynamic(() => import('@/components/blog/posts/ProductivityToolsGuide'));
const Base64EncodingGuide = dynamic(() => import('@/components/blog/posts/Base64EncodingGuide'));
const LotteryWinningStrategy = dynamic(() => import('@/components/blog/posts/LotteryWinningStrategy'));
const ResumeWritingGuide = dynamic(() => import('@/components/blog/posts/ResumeWritingGuide'));
const OnlineShoppingTips = dynamic(() => import('@/components/blog/posts/OnlineShoppingTips'));
const SalaryCalculatorGuide2025 = dynamic(() => import('@/components/blog/posts/SalaryCalculatorGuide2025'));
const StockAverageDownStrategy = dynamic(() => import('@/components/blog/posts/StockAverageDownStrategy'));
const Base64ImageGuide = dynamic(() => import('@/components/blog/posts/Base64ImageGuide'));
const CompoundInterestGuide = dynamic(() => import('@/components/blog/posts/CompoundInterestGuide'));
const UuidGuide = dynamic(() => import('@/components/blog/posts/UuidGuide'));
const JwtGuide = dynamic(() => import('@/components/blog/posts/JwtGuide'));
const PomodoroTechnique = dynamic(() => import('@/components/blog/posts/PomodoroTechnique'));
const QrCodeGuide = dynamic(() => import('@/components/blog/posts/QrCodeGuide'));

const POSTS: Record<string, React.ComponentType<{ lang: string }>> = {
    'json-formatting-guide': JsonFormattingGuide,
    'character-encoding-guide': CharacterEncodingGuide,
    'resume-word-count': ResumeWordCount,
    'server-time-ticketing-guide': ServerTimeTicketingGuide,
    'productivity-tools-guide': ProductivityToolsGuide,
    'base64-encoding-guide': Base64EncodingGuide,
    'lottery-winning-strategy': LotteryWinningStrategy,
    'resume-writing-guide': ResumeWritingGuide,
    'online-shopping-tips': OnlineShoppingTips,
    'salary-calculator-guide-2025': SalaryCalculatorGuide2025,
    'stock-average-down-strategy': StockAverageDownStrategy,
    'base64-image-guide': Base64ImageGuide,
    'compound-interest-guide': CompoundInterestGuide,
    'uuid-guide': UuidGuide,
    'jwt-guide': JwtGuide,
    'pomodoro-technique': PomodoroTechnique,
    'qr-code-guide': QrCodeGuide,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    let title = `${dict.nav.blog}`;
    let description = dict.common.description;

    if (slug === 'resume-word-count') {
        if (lang === 'ko') {
            title = "자기소개서 글자 수 세기: 공백 포함 vs 미포함 차이점 완벽 정리";
            description = "자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.";
        } else if (lang === 'en') {
            title = "Resume Word Count: With Spaces vs Without Spaces";
            description = "Confused about word counts in resumes? Learn the difference between \"with spaces\" and \"without spaces\" and get tips for optimizing your resume length.";
        } else if (lang === 'ja') {
            title = "履歴書の文字数カウント：空白あり vs 空白なし 完全ガイド";
            description = "履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。";
        }
    } else if (slug === 'json-formatting-guide') {
        if (lang === 'ko') {
            title = "개발자에게 JSON 포맷팅이 필수적인 이유";
            description = "JSON 데이터가 왜 엉망으로 보일까요? 디버깅과 협업을 위해 필수적인 JSON 포맷팅(Pretty Print)의 중요성과 압축(Minify)의 개념을 완벽하게 정리해 드립니다.";
        } else if (lang === 'en') {
            title = "Why JSON Formatting is Essential for Developers";
            description = "Learn why proper JSON formatting is crucial for debugging, readability, and collaboration. We explain minification, pretty-printing, and how to use our JSON Formatter.";
        } else if (lang === 'ja') {
            title = "開発者にとってJSONフォーマットが不可欠な理由";
            description = "なぜJSONデータは読みづらいのでしょうか？デバッグや共同作業に不可欠なJSON整形（Pretty Print）の重要性と、圧縮（Minify）の概念を完全に解説します。";
        }
    } else if (slug === 'character-encoding-guide') {
        if (lang === 'ko') {
            title = "문자 인코딩의 이해: UTF-8 vs ASCII 완벽 정리";
            description = "왜 한글이 깨져서 나올까요? 개발자가 반드시 알아야 할 아스키(ASCII) 코드와 유니코드(UTF-8)의 차이점, 그리고 뷇뛟 같은 글자가 생기는 이유를 설명합니다.";
        } else if (lang === 'en') {
            title = "Understanding Character Encodings: UTF-8 vs ASCII";
            description = "Why do broken characters (Mojibake) appear? We explain the fundamental differences between ASCII, UTF-8, and Unicode for developers.";
        } else if (lang === 'ja') {
            title = "文字コードの理解：UTF-8 vs ASCII 完全ガイド";
            description = "なぜ文字化けが発生するのでしょうか？開発者が知っておくべきASCIIコードとUnicode（UTF-8）の違い、そして文字化けの原因を解説します。";
        }
    } else if (slug === 'server-time-ticketing-guide') {
        if (lang === 'ko') {
            title = "티켓팅 성공률을 높이는 서버 시간 확인 완벽 가이드";
            description = "콘서트 티켓팅에 번번이 실패하시나요? 인터파크, 멜론티켓, 예스24에서 성공하는 서버 시간 확인 방법과 티켓팅 꿀팁을 공개합니다.";
        } else if (lang === 'en') {
            title = "How to Check Server Time for Successful Ticket Purchases";
            description = "Missing out on concert tickets? Learn how to check server time accurately and increase your success rate for ticketing on Ticketmaster, StubHub, and more.";
        } else if (lang === 'ja') {
            title = "チケット予約成功率を高めるサーバー時間確認完全ガイド";
            description = "コンサートチケットの予約に失敗していませんか？チケットぴあ、イープラスで成功するサーバー時間確認方法とチケット予約のコツを公開します。";
        }
    } else if (slug === 'productivity-tools-guide') {
        if (lang === 'ko') {
            title = "생산성을 2배로 높이는 온라인 도구 활용법 TOP 5";
            description = "하루 업무 시간을 2시간 단축시키는 무료 온라인 도구들! 글자 수 세기부터 JSON 포맷팅까지, 스마트하게 일하는 방법을 알려드립니다.";
        } else if (lang === 'en') {
            title = "Top 5 Online Tools to Double Your Productivity in 2025";
            description = "Discover free online tools that will transform your workflow. From word counting to JSON formatting, learn how to work smarter, not harder.";
        } else if (lang === 'ja') {
            title = "生産性を2倍にするオンラインツール活用法 TOP 5";
            description = "1日の作業時間を2時間短縮する無料オンラインツール！文字数カウントからJSON整形まで、スマートに働く方法をお教えします。";
        }
    } else if (slug === 'base64-encoding-guide') {
        if (lang === 'ko') {
            title = "Base64 인코딩 완전 정복: 개발자를 위한 사용 가이드";
            description = "Base64 인코딩이 뭔가요? 왜 사용할까요? 이미지 데이터 전송부터 API 인증까지, Base64의 모든 것을 쉽게 설명합니다.";
        } else if (lang === 'en') {
            title = "Base64 Encoding Explained: A Complete Guide for Developers";
            description = "What is Base64 encoding and why do we need it? Learn how Base64 works, when to use it, and common use cases in web development.";
        } else if (lang === 'ja') {
            title = "Base64エンコーディング完全攻略：開発者のための使用ガイド";
            description = "Base64エンコーディングとは何ですか？なぜ使うのですか？画像データ転送からAPI認証まで、Base64のすべてを分かりやすく説明します。";
        }
    } else if (slug === 'lottery-winning-strategy') {
        if (lang === 'ko') {
            title = "로또 1등 당첨 확률 높이는 번호 선택 전략 완벽 가이드";
            description = "로또 당첨 확률을 높일 수 있을까요? 통계 데이터로 검증된 번호 선택 전략과 피해야 할 실수를 공개합니다.";
        } else if (lang === 'en') {
            title = "How to Increase Your Chances of Winning the Lottery: Number Selection Strategies";
            description = "Can you really increase lottery odds? Learn data-driven strategies for selecting winning numbers and common mistakes to avoid.";
        } else if (lang === 'ja') {
            title = "宝くじ1等当選確率を高める番号選択戦略完全ガイド";
            description = "宝くじの当選確率を上げることはできるのでしょうか？統計データで検証された番号選択戦略と避けるべきミスを公開します。";
        }
    } else if (slug === 'resume-writing-guide') {
        if (lang === 'ko') {
            title = "대기업 합격하는 자기소개서 작성법과 글자 수 최적화 전략";
            description = "대기업 인사담당자가 직접 알려주는 합격 자소서 비법! 글자 수 최적화부터 내용 구성까지 완벽 가이드.";
        } else if (lang === 'en') {
            title = "How to Write a Winning Resume That Gets You Hired at Top Companies";
            description = "Land your dream job with a perfect resume. Learn word count optimization, formatting tips, and what recruiters actually look for.";
        } else if (lang === 'ja') {
            title = "大手企業に合格する履歴書・ES作成法と文字数最適化戦略";
            description = "大手企業の人事担当者が教える合格ES秘訣！文字数最適化から内容構成まで完全ガイド。";
        }
    } else if (slug === 'online-shopping-tips') {
        if (lang === 'ko') {
            title = "2025년 온라인 쇼핑 최저가 찾는 법: 쿠팡, 네이버 가격 비교 꿀팁";
            description = "매번 바가지 쓰시나요? 쿠팡, 네이버쇼핑, SSG에서 최저가를 찾는 검증된 방법과 숨겨진 할인 혜택 공개!";
        } else if (lang === 'en') {
            title = "Best Online Shopping Tips 2025: How to Find Lowest Prices";
            description = "Save money on every purchase! Master price comparison strategies for Amazon, eBay, and other major shopping sites.";
        } else if (lang === 'ja') {
            title = "2025年オンラインショッピング最安値の探し方：楽天、Amazon価格比較テクニック";
            description = "毎回損していませんか？楽天、Amazon、Yahoo!ショッピングで最安値を見つける検証済み方法と隠れた割引特典公開！";
        }
    } else if (slug === 'salary-calculator-guide-2025') {
        if (lang === 'ko') {
            title = "2025년 연봉 실수령액 계산기: 내 월급은 얼마일까?";
            description = "연봉 3천, 5천, 1억... 계약서에 적힌 금액과 실제 통장에 들어오는 돈은 왜 다를까요? 2025년 최신 세율이 적용된 4대보험과 소득세를 완벽하게 분석해 드립니다.";
        } else if (lang === 'en') {
            title = "2025 Salary Calculator: How Much is My Take-Home Pay?";
            description = "Gross Salary vs. Net Salary. Why is the money in my bank account different from my contract? We explain taxes and deductions for 2025.";
        } else if (lang === 'ja') {
            title = "2025年給与手取り計算機：私の手取りはいくら？";
            description = "年収300万、500万... 契約書の金額と実際に振り込まれる金額はなぜ違うのでしょうか？2025年の最新税率を適用した社会保険と税金を完全に分析します。";
        }
    } else if (slug === 'stock-average-down-strategy') {
        if (lang === 'ko') {
            title = "주식 물타기 계산기 활용법: 손실을 수익으로 바꾸는 매수 전략";
            description = "지금 사면 평단가 얼마나 낮아질까? 감으로 물타기 하다가 비자발적 장기 투자자가 되셨나요? 정확한 계산과 전략만이 살길입니다.";
        } else if (lang === 'en') {
            title = "Stock Average Down Strategy: How to Turn Losses into Profits";
            description = "Bought high and the price dropped? Don't panic. Learn how to use the Averaging Down strategy to lower your break-even price and recover faster.";
        } else if (lang === 'ja') {
            title = "株式ナンピン計算機活用法：損失を利益に変える買い増し戦略";
            description = "今買えば平均単価はどれくらい下がる？勘でナンピン買いをして塩漬け株を作っていませんか？正確な計算と戦略だけが生き残る道です。";
        }
    } else if (slug === 'base64-image-guide') {
        if (lang === 'ko') {
            title = "이미지 Base64 변환 완벽 가이드: 장단점과 사용법";
            description = "이미지를 Base64로 변환하면 무엇이 좋을까요? 웹 성능에 미치는 영향과 언제 사용해야 하는지, 그리고 무료 변환 도구 사용법까지 알려드립니다.";
        } else if (lang === 'en') {
            title = "What is Base64 Image Encoding? Complete Guide & Converter Tool";
            description = "Why use Base64 for images? Learn the pros and cons of embedding images as Base64 strings and how to use our free converter tool.";
        } else if (lang === 'ja') {
            title = "画像Base64変換完全ガイド：メリット・デメリットと使い方";
            description = "画像をBase64に変換する理由とは？Webパフォーマンスへの影響や使いどころ、そして無料変換ツールの使い方まで解説します。";
        }
    } else if (slug === 'compound-interest-guide') {
        if (lang === 'ko') {
            title = "복리 계산기 활용 가이드: 복리의 마법으로 1억 모으기";
            description = "아인슈타인이 극찬한 복리의 마법! 72의 법칙을 이해하고, 복리 계산기를 활용하여 자산 증식 계획을 세우는 방법을 알려드립니다.";
        } else if (lang === 'en') {
            title = "Compound Interest Calculator Guide: How to Become a Millionaire";
            description = "Einstein called compound interest the 8th wonder of the world. Learn the Rule of 72 and how to use our calculator to plan your financial freedom.";
        } else if (lang === 'ja') {
            title = "複利計算機活用ガイド：複利の魔法で資産を増やす方法";
            description = "アインシュタインが絶賛した複利の魔法！72の法則を理解し、複利計算機を活用して資産形成計画を立てる方法を解説します。";
        }
    } else if (slug === 'uuid-guide') {
        if (lang === 'ko') {
            title = "UUID v4란 무엇인가? 개발자를 위한 고유 식별자 가이드";
            description = "Auto Increment 대신 왜 UUID를 쓸까요? UUID v4의 구조와 충돌 확률, 그리고 언제 사용해야 하는지 명확하게 정리해 드립니다.";
        } else if (lang === 'en') {
            title = "What is UUID v4? A Developer's Guide to Unique Identifiers";
            description = "Why use UUIDs instead of Auto Increment IDs? We explain the structure of UUID v4, collision probabilities, and when to use them in your projects.";
        } else if (lang === 'ja') {
            title = "UUID v4とは？開発者のための固有識別子ガイド";
            description = "Auto Incrementの代わりになぜUUIDを使うのですか？UUID v4の構造と衝突確率、そしていつ使用すべきかを明確に整理します。";
        }
    } else if (slug === 'qr-code-guide') {
        if (lang === 'ko') {
            title = "QR 코드의 원리와 마케팅 활용법: 무료 생성기로 나만의 QR 만들기";
            description = "QR 코드는 어떻게 데이터를 저장할까요? 작동 원리부터 비즈니스 활용 사례, 그리고 무료 QR 코드 생성기 사용법까지 완벽하게 정리해 드립니다.";
        } else if (lang === 'en') {
            title = "How QR Codes Work & Marketing Tips: Create Your Own for Free";
            description = "How do QR codes store data? We explain the working principle, business use cases, and how to use our free QR code generator.";
        } else if (lang === 'ja') {
            title = "QRコードの仕組みとマーケティング活用法：無料生成器で自分だけのQRを作ろう";
            description = "QRコードはどのようにデータを保存するのでしょうか？動作原理からビジネス活用事例、そして無料QRコード生成器の使い方まで完全に整理します。";
        }
    }

    return {
        title: `${title} - ${dict.common.title}`,
        description: description,
        openGraph: {
            title: `${title} - ${dict.common.title}`,
            description: description,
            type: 'article',
            url: `https://cheetset.com/${lang}/blog/${slug}`,
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} - ${dict.common.title}`,
            description: description,
            images: ['/og-image.png'],
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = await params;

    // Validate language
    if (!['en', 'ko', 'ja'].includes(lang)) {
        notFound();
    }

    const PostComponent = POSTS[slug];

    if (!PostComponent) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
            </div>
        );
    }

    // Fetch metadata for JSON-LD
    // Since the logic is complex and inside generateMetadata, I will simplify for now
    // and just use a generic description or try to extract it.
    // Ideally, I should refactor the metadata logic into a shared function.

    // Let's import the posts data to get the date and basic info if possible.
    // But the detailed title/description logic is in generateMetadata.
    // I will skip the detailed title/description for JSON-LD for now to avoid huge code duplication
    // and just use the component. 
    // WAIT, I can just move the logic to a function.

    const meta = await generateMetadata({ params: Promise.resolve({ lang, slug }) });
    const title = (meta.title as string)?.split(' - ')[0] || 'Blog Post';
    const description = meta.description || '';

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: title,
                    description: description,
                    image: `https://cheetset.com/og-image.png`,
                    datePublished: '2025-12-04', // Hardcoded for now, should be dynamic
                    author: {
                        '@type': 'Organization',
                        name: 'CheetSet',
                        url: 'https://cheetset.com',
                    },
                }}
            />
            <PostComponent lang={lang} />
        </>
    );
}
