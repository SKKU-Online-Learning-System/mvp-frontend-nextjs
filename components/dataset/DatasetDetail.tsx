'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DatasetPreview from './DatasetPreview';
import { DatasetItem } from './data/types';

type Props = {
    dataset: DatasetItem;
};

type SectionKey = 'overview' | 'intro' | 'useCases' | 'preview';
type OpenSections = Record<SectionKey, boolean>;

const LABELS = {
    download: '다운로드',
    field: '분야',
    type: '유형',
    source: '출처',
    organization: '제공기관',
    task: '과제 유형',
    year: '구축년도',
    size: '용량',
    views: '조회수',
    likes: '관심',
    overview: '데이터 개요',
    intro: '소개',
    useCases: '활용 예시',
    preview: '샘플 데이터',
    updateDate: '갱신년월',
    format: '데이터 형식',
    labelFormat: '라벨링 형식',
    service: '활용 서비스',
    amount: '데이터 구축량',
    purpose: '활용 방향',
    history: '변경 이력',
    alert: '다운로드가 시작되었습니다.',
};

const overviewRows = (dataset: DatasetItem) => [
    { label: LABELS.field, value: dataset.tags.join(', ') },
    { label: LABELS.type, value: dataset.type },
    { label: LABELS.source, value: dataset.source },
    { label: LABELS.organization, value: dataset.organization },
    { label: LABELS.task, value: dataset.task },
    { label: LABELS.year, value: String(dataset.year) },
    { label: LABELS.updateDate, value: dataset.updatedAt },
    { label: LABELS.size, value: dataset.size },
];

const metadataRows = (dataset: DatasetItem) => [
    {
        label: LABELS.field,
        value: dataset.tags.join(', '),
    },
    {
        label: '데이터 유형',
        value: dataset.type,
    },
    {
        label: LABELS.format,
        value: dataset.formats.join(', '),
    },
    {
        label: LABELS.labelFormat,
        value: dataset.annotationFormat,
    },
    {
        label: LABELS.service,
        value: dataset.serviceDomain.join(', '),
    },
    {
        label: LABELS.amount,
        value: dataset.buildScale,
    },
];

type AccordionSectionProps = {
    title: string;
    sectionKey: SectionKey;
    isOpen: boolean;
    onToggle: (key: SectionKey) => void;
    children: React.ReactNode;
};

function AccordionSection({
    title,
    sectionKey,
    isOpen,
    onToggle,
    children,
}: AccordionSectionProps) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <button
                type="button"
                onClick={() => onToggle(sectionKey)}
                className="flex w-full items-center justify-between px-7 py-6 text-left"
            >
                <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
            </button>
            {isOpen ? <div className="border-t border-slate-200 p-7">{children}</div> : null}
        </section>
    );
}

export default function DatasetDetail({ dataset }: Props) {
    const [downloads, setDownloads] = useState(dataset.downloads);
    const [openSections, setOpenSections] = useState<OpenSections>({
        overview: true,
        intro: true,
        useCases: true,
        preview: true,
    });

    useEffect(() => {
        const saved = localStorage.getItem(`downloads-${dataset.id}`);
        if (saved) {
            setDownloads(Number(saved));
        }
    }, [dataset.id]);

    const handleDownload = () => {
        const nextCount = downloads + 1;

        setDownloads(nextCount);
        localStorage.setItem(`downloads-${dataset.id}`, String(nextCount));
        alert(LABELS.alert);
    };

    const handleToggle = (section: SectionKey) => {
        setOpenSections((current) => ({
            ...current,
            [section]: !current[section],
        }));
    };

    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5 md:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-[34px]">
                        {dataset.title}
                    </h1>
                </div>

                <div className="px-6 py-7 md:px-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                            <img
                                src={dataset.image}
                                alt={dataset.title}
                                className="h-16 w-16 object-contain"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs font-semibold text-slate-400">
                                        {LABELS.field}
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-800">
                                        {dataset.tags.join(', ')}
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs font-semibold text-slate-400">
                                        {LABELS.type}
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-800">
                                        {dataset.type}
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                                    <div className="text-xs font-semibold text-slate-400">
                                        {LABELS.source}
                                    </div>
                                    <div className="mt-2 text-sm font-semibold text-slate-800">
                                        {dataset.source}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                                <span>
                                    {LABELS.year} : {dataset.year}
                                </span>
                                <span>
                                    {LABELS.updateDate} : {dataset.updatedAt}
                                </span>
                                <span>
                                    {LABELS.views} : {dataset.views.toLocaleString()}
                                </span>
                                <span>
                                    {LABELS.download} : {downloads.toLocaleString()}
                                </span>
                                <span>
                                    {LABELS.size} : {dataset.size}
                                </span>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleDownload}
                                    className="inline-flex rounded-xl bg-[#ff6f5d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f75e4a]"
                                >
                                    {LABELS.download}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-6 space-y-4">
                <AccordionSection
                    title={LABELS.overview}
                    sectionKey="overview"
                    isOpen={openSections.overview}
                    onToggle={handleToggle}
                >
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <div className="grid border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 md:grid-cols-3">
                            <div className="px-5 py-4">{LABELS.field}</div>
                            <div className="px-5 py-4">{LABELS.type}</div>
                            <div className="px-5 py-4">{LABELS.size}</div>
                        </div>
                        <div className="grid text-sm text-slate-700 md:grid-cols-3">
                            <div className="border-b border-slate-100 px-5 py-4 md:border-b-0 md:border-r">
                                {dataset.tags.join(', ')}
                            </div>
                            <div className="border-b border-slate-100 px-5 py-4 md:border-b-0 md:border-r">
                                {dataset.type}
                            </div>
                            <div className="px-5 py-4">{dataset.size}</div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {overviewRows(dataset).map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4"
                            >
                                <span className="text-sm text-slate-500">
                                    {row.label}
                                </span>
                                <span className="text-sm font-semibold text-slate-800">
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </AccordionSection>

                <AccordionSection
                    title={LABELS.intro}
                    sectionKey="intro"
                    isOpen={openSections.intro}
                    onToggle={handleToggle}
                >
                    <p className="text-[15px] leading-8 text-slate-600">
                        {dataset.descriptionDetail}
                    </p>

                    <h3 className="mt-8 text-lg font-semibold text-slate-900">
                        {LABELS.purpose}
                    </h3>
                    <p className="mt-3 text-[15px] leading-8 text-slate-600">
                        {dataset.purpose}
                    </p>

                    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                        {metadataRows(dataset).map((row, index) => (
                            <div
                                key={row.label}
                                className={`grid text-sm md:grid-cols-[220px_minmax(0,1fr)] ${
                                    index !== metadataRows(dataset).length - 1
                                        ? 'border-b border-slate-200'
                                        : ''
                                }`}
                            >
                                <div className="bg-slate-50 px-5 py-4 font-semibold text-slate-600">
                                    {row.label}
                                </div>
                                <div className="px-5 py-4 leading-7 text-slate-700">
                                    {row.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="mt-8 text-lg font-semibold text-slate-900">
                        {LABELS.history}
                    </h3>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                        <div className="grid border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 md:grid-cols-3">
                            <div className="px-5 py-4">버전</div>
                            <div className="px-5 py-4">일자</div>
                            <div className="px-5 py-4">변경내용</div>
                        </div>
                        {dataset.changeHistory.map((item) => (
                            <div
                                key={`${item.version}-${item.date}`}
                                className="grid border-t border-slate-100 text-sm text-slate-700 first:border-t-0 md:grid-cols-3"
                            >
                                <div className="px-5 py-4">{item.version}</div>
                                <div className="px-5 py-4">{item.date}</div>
                                <div className="px-5 py-4">{item.description}</div>
                            </div>
                        ))}
                    </div>
                </AccordionSection>

                <AccordionSection
                    title={LABELS.useCases}
                    sectionKey="useCases"
                    isOpen={openSections.useCases}
                    onToggle={handleToggle}
                >
                    <div className="space-y-3">
                        {dataset.useCases.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className="rounded-2xl border border-slate-200 px-5 py-4"
                            >
                                <div className="text-sm font-semibold text-slate-400">
                                    USE CASE {String(index + 1).padStart(2, '0')}
                                </div>
                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </AccordionSection>

                <AccordionSection
                    title={LABELS.preview}
                    sectionKey="preview"
                    isOpen={openSections.preview}
                    onToggle={handleToggle}
                >
                    <p className="text-sm leading-6 text-slate-500">
                        {dataset.sampleNotice}
                    </p>
                    <div className="mt-5">
                        <DatasetPreview dataset={dataset} />
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}
