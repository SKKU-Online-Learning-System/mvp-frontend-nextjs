'use client';

import { SearchBar } from '@/components/common/Header';
import { Badge } from '@/components/ui/badge';
import { useRouter, useSearchParams } from 'next/navigation';
import ContentFilterSkeleton from '../../common/ContentFilterSkeleton';
import { ComboBox, Framework } from './ComboBox';
import { CategoryKey, Filter } from './category';

type Props = {
  filterList?: Filter[] | undefined;
  filterToggle?: (name: CategoryKey) => void;
  sort: string;
  changeSort: (sortOption: string) => void;
  year: string | undefined;
  changeYear: (year: string) => void;
  setDefaultSortYear: () => void;
  showBadge?: boolean;
  showFieldFilter?: boolean;
  fields?: string[];
  setFields?: (fields: string[]) => void;
};

const currentYear = new Date().getFullYear();
const yearFrameworks: Framework[] = Array.from(
  { length: currentYear - 2020 + 1 },
  (_, i) => {
    const year = (2020 + i).toString();
    return {
      value: year,
      label: year,
    };
  }
);

const sortFrameworks: Framework[] = [
  {
    value: 'upload',
    label: '업로드순',
  },
  {
    value: 'view',
    label: '조회순',
  },
];

const FIELD_TAGS = [
  { label: '전체', icon: '🌐' },

  { label: '금융', icon: '💰' },
  { label: '재난·안전·환경', icon: '🔥' },
  { label: '교통', icon: '🚗' },
  { label: '의료', icon: '🩺' },
  { label: '교육', icon: '🎓' },
  { label: '농축·수산', icon: '🌾' },
  { label: '문화·관광', icon: '🏛️' },

  { label: '이미지', icon: '🖼️' },
  { label: '영상', icon: '🎥' },
  { label: '음성', icon: '🎧' },

  { label: '시계열', icon: '⏱️' },
  { label: '이상탐지', icon: '🚨' },
];

export default function ContentFilter({
  filterList,
  filterToggle,
  sort,
  changeSort,
  year,
  changeYear,
  setDefaultSortYear,
  showBadge = true,
  showFieldFilter = false,
  fields,
  setFields,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeCategory = (newCategory: string) => {
    if (newCategory === '인턴십 참여 기업') {
      router.push('/content/activity/internship-companies');
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('category', newCategory);
    router.push(`?${params.toString()}`);
  };
  const toggleField = (tag: string) => {
    if (!fields || !setFields) return;

    // ⭐ 전체 클릭
    if (tag === '전체') {
      setFields([]);
      return;
    }

    let newFields: string[];

    if (fields.includes(tag)) {
      newFields = fields.filter((f) => f !== tag);
    } else {
      newFields = [...fields, tag];
    }

    setFields(newFields);
  };

  const onClick = (name: CategoryKey) => {
    if (!filterList || !filterToggle) return;

    setDefaultSortYear();
    filterToggle(name);
    changeCategory(name);
  };

  const isActive = (label: string) => {
    if (label === '전체') return fields?.length === 0;
    return fields?.includes(label);
  };

  return (
    <div className='flex flex-col gap-4'>
      {showFieldFilter && fields && setFields && (
        <div className='grid grid-cols-[100px_1fr] gap-3'>
          {/* 🌐 전체 버튼 */}
          <button
            onClick={() => setFields([])}
            className={`
        flex flex-col items-center justify-center
        rounded-2xl border
        transition-all duration-200
        ${
          fields.length === 0
            ? 'bg-blue-500 text-white shadow-md border-blue-500'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }
      `}
          >
            <span className='text-lg mb-1'>🌐</span>
            <span className='text-sm font-semibold'>ALL</span>
            <span className='text-xs mt-1'>전체</span>
          </button>

          {/* 🧠 분야 버튼들 */}
          <div className='grid grid-cols-3 md:grid-cols-6 gap-3'>
            {FIELD_TAGS.filter((tag) => tag.label !== '전체').map(
              ({ label, icon }) => {
                const isActive = fields.includes(label);

                return (
                  <button
                    key={label}
                    onClick={() => toggleField(label)}
                    className={`
              flex flex-col items-center justify-center
              rounded-2xl py-3 border
              transition-all duration-200
              hover:scale-105 active:scale-95
              ${
                isActive
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }
            `}
                  >
                    <span className='text-xl mb-1'>{icon}</span>
                    <span className='text-xs font-medium'>{label}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* 🏷 1. 카테고리 */}
      {showBadge !== false && (
        <div className='flex flex-wrap gap-2'>
          {filterList
            ? filterList.map(({ name, checked }, idx) => (
                <Badge
                  key={idx}
                  variant={checked ? 'default' : 'secondary'}
                  className='cursor-pointer h-8 font-semibold'
                  onClick={() => onClick(name)}
                >
                  {name}
                </Badge>
              ))
            : Array.from({ length: 3 }).map((_, idx) => (
                <ContentFilterSkeleton key={idx} />
              ))}
        </div>
      )}

      {/* 🔍 2 . 검색창  */}
      <SearchBar />

      {/* ⚙️ 3. 옵션 */}
      <div className='flex justify-end gap-2'>
        <ComboBox
          defaultName='연도'
          frameworks={[{ value: 'all', label: '전체' }, ...yearFrameworks]}
          value={year}
          setValue={changeYear}
        />
        <ComboBox
          defaultName='정렬기준'
          frameworks={sortFrameworks}
          value={sort}
          setValue={changeSort}
        />
      </div>
    </div>
  );
}
