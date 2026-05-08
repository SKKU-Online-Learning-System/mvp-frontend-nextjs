'use client';

import Link from 'next/link';
import { Download, Eye, Heart } from 'lucide-react';

type Dataset = {
    id: number;
    title: string;
    description: string;
    descriptionDetail: string;
    useCases: string[];
    tags: string[];
    type: string;
    image: string;
    year: number;
    size: string;
    views: number;
    likes: number;
    downloads: number;
};

type Props = {
    item: Dataset;
};

const LABELS = {
    download: '\uB2E4\uC6B4\uB85C\uB4DC',
    views: '\uC870\uD68C\uC218',
    likes: '\uC88B\uC544\uC694',
};

export default function CompetitionDatasetCard({ item }: Props) {
    return (
        <Link href={`/dataset/${item.id}`} className="block h-full">
            <article className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#ff6f5d] px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                >
                    <Download className="h-3 w-3" />
                    {LABELS.download}
                </button>

                <div className="flex flex-1 flex-col items-center px-5 pb-4 pt-12 text-center">
                    <div className="flex h-18 w-18 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-12 w-12 object-contain"
                        />
                    </div>

                    <span className="mt-4 text-sm font-semibold text-[#556dff]">
                        {item.tags[0] ?? item.type}
                    </span>

                    <h3 className="mt-5 line-clamp-3 text-[15px] font-semibold leading-6 text-slate-900 transition-colors group-hover:text-slate-700">
                        {item.title}
                    </h3>

                    <p className="mt-4 text-xs font-medium text-[#b47854]">
                        {item.year} | {item.size}
                    </p>
                </div>

                <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 text-[12px] text-slate-500">
                    <div className="flex items-center justify-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{item.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 border-x border-slate-200">
                        <Heart className="h-3.5 w-3.5" />
                        <span>{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        <span>{item.downloads.toLocaleString()}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
