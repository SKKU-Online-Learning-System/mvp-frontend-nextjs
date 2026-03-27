'use client';

import Link from 'next/link';

type Platform = {
    name: string;
    description: string;
    href: string;
    image: string;
};

type Category = {
    title: string;
    platforms: Platform[];
};

const categories: Category[] = [
    {
        title: '대회 / 해커톤 플랫폼',
        platforms: [
            {
                name: 'Kaggle',
                description:
                    '세계 최대 데이터 사이언스 플랫폼으로 대회 데이터셋 코드 공유까지 가능',
                href: 'https://www.kaggle.com',
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png',
            },
            {
                name: 'Dacon',
                description:
                    '국내 데이터 분석 대회 플랫폼으로 한국어 데이터 기반 프로젝트에 적합',
                href: 'https://dacon.io',
                image: 'data:image/png;base64,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',
            },
            {
                name: 'AI Hub',
                description:
                    '정부 제공 AI 데이터셋 플랫폼으로 음성 텍스트 영상 데이터 제공',
                href: 'https://aihub.or.kr',
                image: 'data:image/png;base64,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',
            },
            {
                name: 'onoffmix',
                description: '네이버, 카카오, 삼성 등 기업 연계 해커톤',
                href: 'https://onoffmix.com',
                image: 'https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F12ff69d0-0e50-4c81-aaff-a8257d26764d%2FLogo.png&blockId=5a339cb5-5a59-42c8-bf35-993ff5e730b7&width=256',
            },
            {
                name: 'DrivenData',
                description:
                    '사회 문제 해결 중심 데이터 분석 대회 플랫폼',
                href: 'https://www.drivendata.org',
                image: 'data:image/png;base64,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',
            },

            {
                name: 'CodaLab',
                description:
                    '연구 및 머신러닝 대회 운영을 위한 오픈 플랫폼',
                href: 'https://codalab.org',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlIBv4dR8j6rK_oYxVbCRdvlkcYf6U0i-YnA&s',
            },

        ],
    },
    {
        title: '공개 데이터셋 저장소',
        platforms: [
            {
                name: 'UCI Repository',
                description:
                    '전통적인 머신러닝 데이터셋 저장소로 실습용으로 적합',
                href: 'https://archive.ics.uci.edu',
                image: 'https://i0.wp.com/ucddigitalliteracy.com/wp-content/uploads/2020/07/uci_1200x675.jpg?fit=1200%2C675&ssl=1&w=640'
            },
            {
                name: 'Google Dataset Search',
                description:
                    '전 세계 데이터셋을 검색할 수 있는 검색 엔진',
                href: 'https://datasetsearch.research.google.com',
                image: 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png',
            },
            {
                name: 'Hugging Face',
                description:
                    'NLP 및 LLM 데이터셋과 모델을 제공하는 플랫폼',
                href: 'https://huggingface.co/datasets',
                image: 'https://huggingface.co/front/assets/huggingface_logo.svg',
            },
            {
                name: 'OpenML',
                description:
                    '머신러닝 실험용 데이터와 메타데이터 제공',
                href: 'https://www.openml.org',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMkh6AVrIQxGeVg4kEodkjAjmQoTHOW1NIw&s',
            },
            {
                name: 'AWS Open Data',
                description:
                    'AWS에서 제공하는 대규모 공개 데이터셋 모음',
                href: 'https://registry.opendata.aws',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZSy14TJ_EjEdf9QDWYSwKhFUq7DrJ_8NAcw&s',
            },
            {
                name: 'zenodo',
                description:
                    '연구 데이터셋과 논문, 코드 등을 저장하고 공유할 수 있는 오픈 저장소',
                href: 'https://zenodo.org/',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJM6SsiWOM90LuE3b-UIolAjnsdBrfR_qeiQ&s',
            },
        ],
    },
    {
        title: '정부 / 기관 데이터',
        platforms: [
            {
                name: 'data.go.kr',
                description:
                    '대한민국 공공데이터 포털로 다양한 현실 데이터 제공',
                href: 'https://www.data.go.kr',
                image: 'https://www.nise.go.kr/sedu/sw2022/pq2/pq2_4/images/01/s1.png',
            },
            {
                name: '서울 열린데이터 광장',
                description:
                    '서울시 교통 인구 등 도시 데이터 제공',
                href: 'https://data.seoul.go.kr',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEBIfOVhSmq1huw_eC7IKuwVJet9hhahkaw&s',
            },
            {
                name: '국가교통데이터베이스',
                description: '교통 및 이동 데이터 제공으로 경로·수요 분석에 활용',
                href: 'https://www.ktdb.go.kr/www/index.do',
                image: '/kosis.png',
            },
            {
                name: 'KOSIS',
                description: '통계청 국가 통계 데이터(경제, 인구, 사회 등) 제공',
                href: 'https://kosis.kr',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNS3iI75fmS-IzA7Zzw8CX1Un4ZC9KsV5WRA&s',
            },
            {
                name: 'World Bank',
                description:
                    '국가별 경제 및 인구 데이터 제공',
                href: 'https://data.worldbank.org',
                image: 'https://i.namu.wiki/i/Av56HFb-xClSLs3Z9yHeFDA1rAlK1ZmeXXGXhqdihSS3w82mehOPfY67Q_IU_CLlXtsxjTfMGVyK2Rd9NDwnxg.svg',
            },
            {
                name: 'NASA',
                description:
                    '위성 및 기후 데이터 제공',
                href: 'https://data.nasa.gov',
                image: 'https://www.ga.com/images/news/nasa-logo.png',
            }
        ],
    },
];

export default function DatasetPlatform() {
    return (
        <div className="my-container pt-6 pb-12">

            {/* 카테고리 */}
            <div className="flex flex-col">
                {categories.map((category, idx) => (
                    <section
                        key={category.title}
                        className="py-8"
                    >
                        {/* 카테고리 제목 */}
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-xl font-semibold whitespace-nowrap">
                                {category.title}
                            </h2>
                            <div className="flex-1 h-px bg-border" />
                        </div>

                        {/* 카드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.platforms.map((platform) => (
                                <Link
                                    key={platform.name}
                                    href={platform.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group rounded-2xl border bg-background p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* 🔥 로고 박스 (핵심 개선) */}
                                    <div className="h-14 w-full flex items-center justify-center mb-4 bg-white rounded-lg">
                                        <img
                                            src={platform.image}
                                            alt={platform.name}
                                            className="max-h-10 max-w-[120px] object-contain"
                                        />
                                    </div>

                                    <div className="text-center">
                                        {/* 이름 */}
                                        <div className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                                            {platform.name}
                                        </div>

                                        {/* 설명 */}
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {platform.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}