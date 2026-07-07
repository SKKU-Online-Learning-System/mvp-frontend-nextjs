'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowDownWideNarrow,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  Eye,
  MapPin,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { InternshipCompany, internshipCompanies } from './internshipCompanies';

type SearchMode = 'name' | 'field';
type SortKey = 'latest' | 'rating' | 'views';

const VIEW_STORAGE_KEY = 'mrdang-internship-company-views';
const collator = new Intl.Collator('ko-KR', {
  numeric: true,
  sensitivity: 'base',
});

const searchModes: { key: SearchMode; label: string }[] = [
  { key: 'name', label: '이름 기반' },
  { key: 'field', label: '분야 기반' },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'views', label: '조회수순' },
  { key: 'rating', label: '평점순' },
  { key: 'latest', label: '최신순' },
];

const activityNavItems = [
  { name: '인턴십 후기', href: '/content/activity?category=인턴십 후기' },
  {
    name: '인턴십 참여 기업',
    href: '/content/activity/internship-companies',
  },
  { name: 'IT 해외봉사', href: '/content/activity?category=IT 해외봉사' },
  { name: '글로벌 챌린지', href: '/content/activity?category=글로벌 챌린지' },
  { name: '현직자 인터뷰', href: '/content/activity?category=현직자 인터뷰' },
];

function normalize(value: string) {
  return value.toLocaleLowerCase('ko-KR').replace(/\s+/g, '');
}

function readViewCounts() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(VIEW_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.entries(parsed).reduce<Record<string, number>>(
      (acc, [key, value]) => {
        if (typeof value === 'number' && Number.isFinite(value)) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
  } catch {
    return {};
  }
}

function writeViewCounts(viewCounts: Record<string, number>) {
  try {
    window.localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(viewCounts));
  } catch {
    // Storage can be unavailable in private browsing or embedded previews.
  }
}

function compareByName(a: InternshipCompany, b: InternshipCompany) {
  return collator.compare(a.name, b.name);
}

function formatRating(rating: number | null) {
  return rating === null ? '미공개' : rating.toFixed(1);
}

function formatYears(company: InternshipCompany) {
  return company.yearLabels.length > 0
    ? company.yearLabels.join(', ')
    : `${company.maxYear}`;
}

function formatPeriod(period: string) {
  if (!period.trim()) {
    return '기간 미공개';
  }

  const periodMatch = period.match(
    /^(\d{2}|\d{4})\.(\d{1,2}월)(?:~(?:(\d{2}|\d{4})\.)?(\d{1,2}월))?$/
  );

  if (!periodMatch) {
    return period;
  }

  const [, startYear, startMonth, endYear, endMonth] = periodMatch;
  const endYearValue = endYear ?? startYear;
  const endMonthValue = endMonth ?? startMonth;

  if (startYear === endYearValue) {
    return startMonth === endMonthValue
      ? startMonth
      : `${startMonth}~${endMonthValue}`;
  }

  return `${formatYear(startYear)}년 ${startMonth}~${formatYear(
    endYearValue
  )}년 ${endMonthValue}`;
}

function formatYear(year: string) {
  return year.length === 2 ? `20${year}` : year;
}

function topItems(items: string[], limit = 3) {
  return items.slice(0, limit);
}

export function InternshipCompanyDirectory() {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('name');
  const [sortKey, setSortKey] = useState<SortKey>('latest');
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
    setViewCounts(readViewCounts());
  }, []);

  const visibleCompanies = useMemo(() => {
    const normalizedQuery = normalize(query.trim());

    return internshipCompanies
      .filter((company) => {
        if (!normalizedQuery) {
          return true;
        }

        const target =
          searchMode === 'name'
            ? company.name
            : [
                ...company.industries,
                ...company.roles,
                ...company.notes,
                ...company.locations,
              ].join(' ');

        return normalize(target).includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sortKey === 'views') {
          const viewDiff = (viewCounts[b.id] ?? 0) - (viewCounts[a.id] ?? 0);
          if (viewDiff !== 0) {
            return viewDiff;
          }
          return (
            b.totalParticipants - a.totalParticipants || compareByName(a, b)
          );
        }

        if (sortKey === 'rating') {
          const ratingDiff = (b.averageRating ?? -1) - (a.averageRating ?? -1);
          if (ratingDiff !== 0) {
            return ratingDiff;
          }
          return (
            b.totalParticipants - a.totalParticipants || compareByName(a, b)
          );
        }

        return (
          b.maxYear - a.maxYear ||
          b.totalParticipants - a.totalParticipants ||
          compareByName(a, b)
        );
      });
  }, [query, searchMode, sortKey, viewCounts]);

  useEffect(() => {
    if (visibleCompanies.length === 0) {
      if (selectedCompanyId !== '') {
        setSelectedCompanyId('');
      }
      return;
    }

    if (
      selectedCompanyId === '' ||
      !visibleCompanies.some((company) => company.id === selectedCompanyId)
    ) {
      setSelectedCompanyId(visibleCompanies[0].id);
    }
  }, [selectedCompanyId, visibleCompanies]);

  const selectedCompany =
    visibleCompanies.find((company) => company.id === selectedCompanyId) ??
    visibleCompanies[0] ??
    null;

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setViewCounts((prev) => {
      const next = {
        ...prev,
        [companyId]: (prev[companyId] ?? 0) + 1,
      };
      writeViewCounts(next);
      return next;
    });
  };

  return (
    <main className='my-container pb-16'>
      <div className='flex flex-col gap-6'>
        <section className='flex flex-col gap-5 border-b pb-6'>
          <div className='flex flex-wrap gap-2'>
            {activityNavItems.map((item) => (
              <Badge
                key={item.name}
                asChild
                variant={
                  item.name === '인턴십 참여 기업' ? 'default' : 'secondary'
                }
                className='cursor-pointer h-8 font-semibold'
              >
                <Link href={item.href}>{item.name}</Link>
              </Badge>
            ))}
          </div>

          <div className='grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-center'>
            <div className='inline-flex w-fit rounded-md border bg-white p-1 shadow-xs'>
              {searchModes.map(({ key, label }) => (
                <button
                  key={key}
                  type='button'
                  onClick={() => setSearchMode(key)}
                  className={cn(
                    'h-9 rounded-md px-3 text-sm font-semibold transition',
                    searchMode === key
                      ? 'bg-gray-950 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className='relative'>
              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400' />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  searchMode === 'name' ? '기업명 검색' : '업종·업무 검색'
                }
                className='h-11 bg-white pl-9 pr-10'
              />
              {query && (
                <button
                  type='button'
                  aria-label='검색어 지우기'
                  onClick={() => setQuery('')}
                  className='absolute right-3 top-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700'
                >
                  <X className='size-4' />
                </button>
              )}
            </div>

            <div className='flex flex-wrap gap-2 lg:justify-end'>
              {sortOptions.map(({ key, label }) => (
                <Button
                  key={key}
                  type='button'
                  variant={sortKey === key ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSortKey(key)}
                  className='h-9'
                >
                  <ArrowDownWideNarrow className='size-4' />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <div className='grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,0.8fr)] xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)]'>
          <section className='flex flex-col gap-3'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-sm font-semibold text-gray-700'>
                검색 결과 {visibleCompanies.length.toLocaleString('ko-KR')}개
              </p>
              <p className='text-xs text-gray-500'>
                조회 {Object.values(viewCounts).reduce((a, b) => a + b, 0)}회
              </p>
            </div>

            {visibleCompanies.length === 0 ? (
              <div className='flex min-h-[280px] items-center justify-center rounded-lg border bg-white p-8 text-center text-sm text-gray-500'>
                일치하는 기업이 없습니다.
              </div>
            ) : (
              <div className='grid gap-3 md:grid-cols-2'>
                {visibleCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    selected={company.id === selectedCompany?.id}
                    viewCount={viewCounts[company.id] ?? 0}
                    onClick={() => handleSelectCompany(company.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className='lg:sticky lg:top-24'>
              {selectedCompany ? (
                <CompanyDetail
                  company={selectedCompany}
                  viewCount={viewCounts[selectedCompany.id] ?? 0}
                />
              ) : (
                <div className='flex min-h-[420px] items-center justify-center rounded-lg border bg-white p-8 text-sm text-gray-500'>
                  선택된 기업이 없습니다.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function CompanyCard({
  company,
  selected,
  viewCount,
  onClick,
}: {
  company: InternshipCompany;
  selected: boolean;
  viewCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type='button'
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'flex min-h-[176px] flex-col gap-3 rounded-lg border bg-white p-4 text-left shadow-xs transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-md',
        selected && 'border-gray-950 ring-2 ring-gray-950/10'
      )}
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <h2 className='break-words text-lg font-bold leading-6 text-gray-950'>
            {company.name}
          </h2>
          <p className='mt-1 text-sm text-gray-500'>
            {topItems(company.industries, 1)[0] ?? '업종 미공개'}
          </p>
        </div>
        <Badge
          variant='secondary'
          className='border-amber-200 bg-amber-50 text-amber-800'
        >
          <Star className='size-3 fill-amber-400 text-amber-500' />
          {formatRating(company.averageRating)}
        </Badge>
      </div>

      <div className='flex flex-wrap gap-2'>
        {topItems(company.roles, 3).map((role) => (
          <Badge key={role} variant='outline' className='bg-white'>
            {role}
          </Badge>
        ))}
        {company.roles.length > 3 && (
          <Badge variant='secondary'>+{company.roles.length - 3}</Badge>
        )}
      </div>

      <div className='mt-auto grid grid-cols-2 gap-2 text-xs text-gray-600'>
        <InfoLine icon={CalendarDays} text={formatYears(company)} />
        <InfoLine
          icon={Users}
          text={`${company.totalParticipants.toLocaleString('ko-KR')}명`}
        />
        <InfoLine
          icon={MapPin}
          text={company.locations.slice(0, 2).join(', ') || '지역 미공개'}
        />
        <InfoLine icon={Eye} text={`${viewCount}회`} />
      </div>
    </button>
  );
}

function CompanyDetail({
  company,
  viewCount,
}: {
  company: InternshipCompany;
  viewCount: number;
}) {
  const primaryWebsite = company.websites[0];

  return (
    <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
      <div className='border-b bg-gray-50 px-5 py-5'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='min-w-0 space-y-2'>
            <div className='flex items-center gap-2 text-sm font-semibold text-emerald-700'>
              <Building2 className='size-4' />
              기업 상세
            </div>
            <h2 className='break-words text-2xl font-bold leading-8 text-gray-950'>
              {company.name}
            </h2>
          </div>
          {primaryWebsite && (
            <Button asChild variant='outline' size='sm' className='shrink-0'>
              <a href={primaryWebsite} target='_blank' rel='noreferrer'>
                사이트
                <ExternalLink className='size-4' />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className='flex max-h-none flex-col gap-6 p-5 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <Metric
            icon={CalendarDays}
            label='참여년도'
            value={formatYears(company)}
          />
          <Metric
            icon={Users}
            label='참여인원'
            value={`${company.totalParticipants.toLocaleString('ko-KR')}명`}
          />
          <Metric
            icon={Star}
            label='평점'
            value={formatRating(company.averageRating)}
          />
          <Metric icon={Eye} label='조회' value={`${viewCount}회`} />
        </div>

        <DetailSection title='업종'>
          <BadgeList items={company.industries} tone='emerald' />
        </DetailSection>

        <DetailSection title='담당 업무'>
          <BadgeList items={company.roles} tone='gray' />
        </DetailSection>

        <div className='grid gap-4 sm:grid-cols-2'>
          <DetailSection title='소재지'>
            <PlainList items={company.locations} />
          </DetailSection>
          <DetailSection title='수행 기간'>
            <PlainList items={company.periods.map(formatPeriod)} />
          </DetailSection>
        </div>

        {company.notes.length > 0 && (
          <DetailSection title='비고'>
            <PlainList items={company.notes} />
          </DetailSection>
        )}

        <DetailSection title='참여 기록'>
          <div className='flex flex-col gap-3'>
            {company.records.map((record) => (
              <div
                key={`${record.source}-${record.sequence}`}
                className='rounded-lg border bg-white p-4'
              >
                <div className='flex flex-wrap items-center gap-2'>
                  <Badge variant='default'>{record.yearLabel}</Badge>
                  <Badge variant='outline'>{formatPeriod(record.period)}</Badge>
                  <Badge variant='secondary'>
                    {record.participants.toLocaleString('ko-KR')}명
                  </Badge>
                  <Badge
                    variant='secondary'
                    className='border-amber-200 bg-amber-50 text-amber-800'
                  >
                    {record.rating || '평점 미공개'}
                  </Badge>
                </div>
                <dl className='mt-3 grid gap-2 text-sm text-gray-700'>
                  <RecordRow label='업종' value={record.industry} />
                  <RecordRow label='담당 업무' value={record.role} />
                  <RecordRow label='소재지' value={record.location} />
                  {record.note && (
                    <RecordRow label='비고' value={record.note} />
                  )}
                  {record.website && (
                    <div className='grid gap-1 sm:grid-cols-[84px_1fr]'>
                      <dt className='font-semibold text-gray-500'>사이트</dt>
                      <dd className='min-w-0'>
                        <a
                          href={record.website}
                          target='_blank'
                          rel='noreferrer'
                          className='inline-flex max-w-full items-center gap-1 break-all font-semibold text-emerald-700 hover:text-emerald-900'
                        >
                          {record.website}
                          <ExternalLink className='size-3 shrink-0' />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        </DetailSection>
      </div>
    </div>
  );
}

function InfoLine({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <span className='flex min-w-0 items-center gap-1.5'>
      <Icon className='size-3.5 shrink-0 text-gray-400' />
      <span className='truncate'>{text}</span>
    </span>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className='min-w-0 rounded-lg bg-gray-50 px-3 py-3'>
      <div className='flex items-center gap-1.5 text-xs font-semibold text-gray-500'>
        <Icon className='size-3.5' />
        {label}
      </div>
      <p className='mt-1 truncate text-base font-bold text-gray-950'>{value}</p>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className='space-y-3'>
      <h3 className='flex items-center gap-2 text-sm font-bold text-gray-950'>
        <BriefcaseBusiness className='size-4 text-emerald-700' />
        {title}
      </h3>
      {children}
    </section>
  );
}

function BadgeList({
  items,
  tone,
}: {
  items: string[];
  tone: 'emerald' | 'gray';
}) {
  if (items.length === 0) {
    return <p className='text-sm text-gray-500'>미공개</p>;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item) => (
        <Badge
          key={item}
          variant='outline'
          className={cn(
            'max-w-full break-words whitespace-normal text-left leading-5',
            tone === 'emerald'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'bg-white text-gray-700'
          )}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
}

function PlainList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className='text-sm text-gray-500'>미공개</p>;
  }

  return (
    <div className='flex flex-wrap gap-2 text-sm text-gray-700'>
      {items.map((item) => (
        <span key={item} className='rounded-md bg-gray-50 px-2.5 py-1.5'>
          {item}
        </span>
      ))}
    </div>
  );
}

function RecordRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='grid gap-1 sm:grid-cols-[84px_1fr]'>
      <dt className='font-semibold text-gray-500'>{label}</dt>
      <dd className='break-words'>{value || '미공개'}</dd>
    </div>
  );
}
