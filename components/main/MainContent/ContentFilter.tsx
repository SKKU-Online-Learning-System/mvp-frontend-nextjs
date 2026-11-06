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

const FIELD_GROUPS: { label: string; tags: string[] }[] = [
  {
    label: '분야',
    tags: [
      '금융',
      '재난·안전·환경',
      '교통',
      '의료',
      '교육',
      '농축·수산',
      '문화·관광',
    ],
  },
  {
    label: '유형',
    tags: ['이미지', '영상', '음성', '시계열', '이상탐지'],
  },
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

    if (fields.includes(tag)) {
      setFields(fields.filter((f) => f !== tag));
    } else {
      setFields([...fields, tag]);
    }
  };

  const onClick = (name: CategoryKey) => {
    if (!filterList || !filterToggle) return;

    setDefaultSortYear();
    filterToggle(name);
    changeCategory(name);
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* 1. 카테고리 */}
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

      {/* 2. 데이터셋 분야·유형 필터 */}
      {showFieldFilter && fields && setFields && (
        <div className='flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3.5 shadow-xs sm:px-5'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='w-10 shrink-0 text-xs font-semibold text-gray-500'>
              전체
            </span>
            <Badge
              variant={fields.length === 0 ? 'default' : 'secondary'}
              className='h-8 cursor-pointer px-3 font-semibold'
              onClick={() => setFields([])}
            >
              전체 보기
            </Badge>
            {fields.length > 0 && (
              <span className='text-xs text-gray-400'>
                {fields.length}개 선택됨
              </span>
            )}
          </div>

          {FIELD_GROUPS.map((group) => (
            <div
              key={group.label}
              className='flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3'
            >
              <span className='w-10 shrink-0 text-xs font-semibold text-gray-500'>
                {group.label}
              </span>
              {group.tags.map((tag) => {
                const isActive = fields.includes(tag);

                return (
                  <Badge
                    key={tag}
                    variant={isActive ? 'default' : 'outline'}
                    className={`h-8 cursor-pointer px-3 font-medium transition ${
                      isActive ? '' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => toggleField(tag)}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 3. 검색창 */}
      <SearchBar />

      {/* 4. 옵션 */}
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
