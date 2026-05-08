'use client';

import { useEffect, useMemo, useState } from 'react';
import { DatasetItem, PreviewFile, PreviewValue } from './data/types';

type Props = {
    dataset: DatasetItem;
};

type ViewMode = 'table' | 'csv' | 'stats';
type SortDirection = 'asc' | 'desc';
type ColumnFilters = Record<string, string>;

const PAGE_SIZE = 5;
const HISTOGRAM_BINS = 5;

const LABELS = {
    table: '표 보기',
    csv: 'CSV 보기',
    stats: '통계 보기',
    search: '행 검색',
    searchPlaceholder: '값, 키워드, 카테고리로 검색',
    filter: '컬럼 필터',
    filterPlaceholder: '필터',
    file: '파일',
    fileDescription: '샘플 파일 설명',
    downloadCsv: 'CSV 다운로드',
    rows: '행 수',
    columns: '열 수',
    numericColumns: '수치 컬럼',
    completion: '데이터 채움률',
    filteredRows: '검색 결과',
    csvPreview: 'CSV 미리보기',
    numericSummary: '수치 컬럼 요약',
    categoricalSummary: '범주형 컬럼 요약',
    columnProfile: '컬럼 프로필',
    average: '평균',
    min: '최소',
    max: '최대',
    unique: '고유값',
    sample: '예시',
    topValues: '상위 값 분포',
    emptyStats: '표시할 통계가 없습니다.',
    noRows: '조건에 맞는 행이 없습니다.',
    count: '건수',
    valueType: '값 유형',
    sortable: '정렬 가능',
    missing: '결측치',
    page: '페이지',
    prev: '이전',
    next: '다음',
    histogram: '분포 히스토그램',
    resetFilters: '필터 초기화',
};

function formatValue(value: PreviewValue) {
    return typeof value === 'number' ? value.toLocaleString() : value;
}

function inferColumnType(values: PreviewValue[]) {
    if (values.length > 0 && values.every((value) => typeof value === 'number')) {
        return 'number';
    }

    return 'string';
}

function buildHistogram(values: number[]) {
    if (values.length === 0) {
        return [];
    }

    const min = Math.min(...values);
    const max = Math.max(...values);

    if (min === max) {
        return [{ label: `${min}`, count: values.length }];
    }

    const step = (max - min) / HISTOGRAM_BINS;
    const bins = Array.from({ length: HISTOGRAM_BINS }, (_, index) => ({
        start: min + step * index,
        end: index === HISTOGRAM_BINS - 1 ? max : min + step * (index + 1),
        count: 0,
    }));

    values.forEach((value) => {
        const rawIndex = Math.floor((value - min) / step);
        const index = Math.min(HISTOGRAM_BINS - 1, rawIndex);
        bins[index].count += 1;
    });

    return bins.map((bin) => ({
        label: `${bin.start.toFixed(1)} - ${bin.end.toFixed(1)}`,
        count: bin.count,
    }));
}

export default function DatasetPreview({ dataset }: Props) {
    const previewFiles = useMemo<PreviewFile[]>(
        () =>
            dataset.previewFiles?.length
                ? dataset.previewFiles
                : [
                    {
                        id: `${dataset.id}-default`,
                        name: 'preview.csv',
                        columns: dataset.previewColumns,
                        rows: dataset.previewRows,
                    },
                ],
        [dataset]
    );

    const [activeFileId, setActiveFileId] = useState(previewFiles[0]?.id ?? '');
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<string>(previewFiles[0]?.columns[0]?.key ?? '');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
    const [page, setPage] = useState(1);

    const activeFile = useMemo(
        () => previewFiles.find((file) => file.id === activeFileId) ?? previewFiles[0],
        [activeFileId, previewFiles]
    );

    useEffect(() => {
        setActiveFileId(previewFiles[0]?.id ?? '');
    }, [previewFiles]);

    useEffect(() => {
        setSortKey(activeFile?.columns[0]?.key ?? '');
        setSortDirection('asc');
        setColumnFilters({});
        setPage(1);
    }, [activeFile?.id]);

    const csvText = useMemo(() => {
        const header = activeFile.columns.map((column) => column.label).join(',');
        const rows = activeFile.rows.map((row) =>
            activeFile.columns
                .map((column) => {
                    const value = row[column.key];
                    const stringValue = value === undefined ? '' : String(value);

                    if (stringValue.includes(',') || stringValue.includes('"')) {
                        return `"${stringValue.replaceAll('"', '""')}"`;
                    }

                    return stringValue;
                })
                .join(',')
        );

        return [header, ...rows].join('\n');
    }, [activeFile.columns, activeFile.rows]);

    const filteredRows = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();

        return activeFile.rows.filter((row) => {
            const matchesGlobal =
                !normalized ||
                activeFile.columns.some((column) =>
                    String(row[column.key] ?? '')
                        .toLowerCase()
                        .includes(normalized)
                );

            const matchesColumnFilters = activeFile.columns.every((column) => {
                const filterValue = columnFilters[column.key]?.trim().toLowerCase();

                if (!filterValue) {
                    return true;
                }

                return String(row[column.key] ?? '')
                    .toLowerCase()
                    .includes(filterValue);
            });

            return matchesGlobal && matchesColumnFilters;
        });
    }, [activeFile.columns, activeFile.rows, columnFilters, searchTerm]);

    const sortedRows = useMemo(() => {
        const rows = [...filteredRows];

        if (!sortKey) {
            return rows;
        }

        rows.sort((a, b) => {
            const left = a[sortKey];
            const right = b[sortKey];

            if (typeof left === 'number' && typeof right === 'number') {
                return sortDirection === 'asc' ? left - right : right - left;
            }

            const leftString = String(left ?? '');
            const rightString = String(right ?? '');

            return sortDirection === 'asc'
                ? leftString.localeCompare(rightString)
                : rightString.localeCompare(leftString);
        });

        return rows;
    }, [filteredRows, sortDirection, sortKey]);

    const pagedRows = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return sortedRows.slice(start, start + PAGE_SIZE);
    }, [page, sortedRows]);

    const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));

    const stats = useMemo(() => {
        const totalRows = activeFile.rows.length;
        const totalColumns = activeFile.columns.length;
        const totalCells = totalRows * totalColumns;

        let filledCells = 0;

        const numericColumns = activeFile.columns
            .map((column) => {
                const values = activeFile.rows
                    .map((row) => row[column.key])
                    .filter((value): value is number => typeof value === 'number');

                const missingCount = activeFile.rows.filter(
                    (row) => row[column.key] === undefined || row[column.key] === ''
                ).length;

                return values.length > 0
                    ? {
                        key: column.key,
                        label: column.label,
                        count: values.length,
                        average:
                            values.reduce((sum, value) => sum + value, 0) /
                            values.length,
                        min: Math.min(...values),
                        max: Math.max(...values),
                        missingCount,
                        histogram: buildHistogram(values),
                    }
                    : null;
            })
            .filter(
                (
                    column
                ): column is {
                    key: string;
                    label: string;
                    count: number;
                    average: number;
                    min: number;
                    max: number;
                    missingCount: number;
                    histogram: Array<{ label: string; count: number }>;
                } => column !== null
            );

        const categoricalColumns = activeFile.columns
            .map((column) => {
                const values = activeFile.rows
                    .map((row) => row[column.key])
                    .filter((value): value is string => typeof value === 'string');

                const frequencyMap = values.reduce<Record<string, number>>((acc, value) => {
                    acc[value] = (acc[value] ?? 0) + 1;
                    return acc;
                }, {});

                const topValues = Object.entries(frequencyMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3);

                const missingCount = activeFile.rows.filter(
                    (row) => row[column.key] === undefined || row[column.key] === ''
                ).length;

                return values.length > 0
                    ? {
                        key: column.key,
                        label: column.label,
                        uniqueCount: Object.keys(frequencyMap).length,
                        sample: Object.keys(frequencyMap).slice(0, 3).join(', '),
                        topValues,
                        missingCount,
                    }
                    : null;
            })
            .filter(
                (
                    column
                ): column is {
                    key: string;
                    label: string;
                    uniqueCount: number;
                    sample: string;
                    topValues: [string, number][];
                    missingCount: number;
                } => column !== null
            );

        const columnProfiles = activeFile.columns.map((column) => {
            const values = activeFile.rows
                .map((row) => row[column.key])
                .filter((value): value is PreviewValue => value !== undefined && value !== '');

            const missingCount = activeFile.rows.filter(
                (row) => row[column.key] === undefined || row[column.key] === ''
            ).length;

            return {
                key: column.key,
                label: column.label,
                type: inferColumnType(values),
                count: values.length,
                missingCount,
            };
        });

        activeFile.rows.forEach((row) => {
            activeFile.columns.forEach((column) => {
                if (row[column.key] !== undefined && row[column.key] !== '') {
                    filledCells += 1;
                }
            });
        });

        return {
            totalRows,
            totalColumns,
            numericColumns,
            categoricalColumns,
            columnProfiles,
            completionRate:
                totalCells === 0 ? 0 : Math.round((filledCells / totalCells) * 100),
        };
    }, [activeFile.columns, activeFile.rows]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, columnFilters, sortKey, sortDirection, activeFile.id]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const handleSortChange = (nextKey: string) => {
        if (nextKey === sortKey) {
            setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
            return;
        }

        setSortKey(nextKey);
        setSortDirection('asc');
    };

    const handleDownloadCsv = () => {
        const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `${dataset.title.replace(/\s+/g, '-').toLowerCase()}-${activeFile.name}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleColumnFilterChange = (key: string, value: string) => {
        setColumnFilters((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setColumnFilters({});
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        viewMode === 'table'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {LABELS.table}
                </button>
                <button
                    type="button"
                    onClick={() => setViewMode('csv')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        viewMode === 'csv'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {LABELS.csv}
                </button>
                <button
                    type="button"
                    onClick={() => setViewMode('stats')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        viewMode === 'stats'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {LABELS.stats}
                </button>
                <button
                    type="button"
                    onClick={handleResetFilters}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                    {LABELS.resetFilters}
                </button>
                <button
                    type="button"
                    onClick={handleDownloadCsv}
                    className="ml-auto rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                    {LABELS.downloadCsv}
                </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-xs font-medium text-slate-400">{LABELS.file}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {previewFiles.map((file) => (
                        <button
                            key={file.id}
                            type="button"
                            onClick={() => setActiveFileId(file.id)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                activeFile.id === file.id
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {file.name}
                        </button>
                    ))}
                </div>
                {activeFile.description ? (
                    <p className="mt-3 text-sm text-slate-500">
                        {LABELS.fileDescription}: {activeFile.description}
                    </p>
                ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-medium text-slate-400">{LABELS.rows}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                        {stats.totalRows.toLocaleString()}
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-medium text-slate-400">{LABELS.columns}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                        {stats.totalColumns.toLocaleString()}
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-medium text-slate-400">{LABELS.numericColumns}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                        {stats.numericColumns.length.toLocaleString()}
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-medium text-slate-400">{LABELS.completion}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                        {stats.completionRate}%
                    </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-medium text-slate-400">{LABELS.filteredRows}</div>
                    <div className="mt-2 text-lg font-semibold text-slate-900">
                        {sortedRows.length.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <div className="text-xs font-medium text-slate-400">{LABELS.search}</div>
                <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={LABELS.searchPlaceholder}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-slate-400"
                />
            </div>

            {viewMode === 'table' ? (
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    {activeFile.columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className="px-5 py-4 text-left font-semibold"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleSortChange(column.key)}
                                                title={LABELS.sortable}
                                                className="group inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900"
                                            >
                                                <span>{column.label}</span>
                                                <span className="inline-flex w-4 justify-center text-xs text-slate-400">
                                                    {sortKey === column.key ? (
                                                        sortDirection === 'asc' ? '↑' : '↓'
                                                    ) : (
                                                        <span className="opacity-0 transition-opacity group-hover:opacity-100">
                                                            ↕
                                                        </span>
                                                    )}
                                                </span>
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                                <tr className="border-t border-slate-200 bg-white">
                                    {activeFile.columns.map((column) => (
                                        <th key={`${column.key}-filter`} className="px-3 py-3">
                                            <div className="text-[11px] font-medium text-slate-400">
                                                {LABELS.filter}
                                            </div>
                                            <input
                                                value={columnFilters[column.key] ?? ''}
                                                onChange={(event) =>
                                                    handleColumnFilterChange(column.key, event.target.value)
                                                }
                                                placeholder={LABELS.filterPlaceholder}
                                                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition-colors focus:border-slate-400"
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pagedRows.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={activeFile.columns.length}
                                            className="px-5 py-8 text-center text-sm text-slate-500"
                                        >
                                            {LABELS.noRows}
                                        </td>
                                    </tr>
                                ) : (
                                    pagedRows.map((row, rowIndex) => (
                                        <tr
                                            key={`${activeFile.id}-${rowIndex}-${page}`}
                                            className="border-t border-slate-200 text-slate-700"
                                        >
                                            {activeFile.columns.map((column, columnIndex) => {
                                                const value = row[column.key];
                                                const isMissing =
                                                    value === undefined || value === '';

                                                return (
                                                    <td
                                                        key={`${activeFile.id}-${rowIndex}-${column.key}`}
                                                        className={`px-5 py-4 ${
                                                            columnIndex === 0
                                                                ? 'whitespace-nowrap font-medium'
                                                                : ''
                                                        }`}
                                                    >
                                                        {isMissing ? (
                                                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                                                                {LABELS.missing}
                                                            </span>
                                                        ) : (
                                                            value
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm">
                        <span className="text-slate-500">
                            {LABELS.page} {page} / {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setPage((current) => Math.max(1, current - 1))}
                                disabled={page === 1}
                                className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {LABELS.prev}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setPage((current) => Math.min(totalPages, current + 1))
                                }
                                disabled={page === totalPages}
                                className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {LABELS.next}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {viewMode === 'csv' ? (
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-4 text-sm font-semibold text-slate-900">
                        {LABELS.csvPreview}
                    </div>
                    <pre className="overflow-x-auto bg-slate-950 px-5 py-5 text-xs leading-6 text-slate-100">
                        <code>{csvText}</code>
                    </pre>
                </div>
            ) : null}

            {viewMode === 'stats' ? (
                <div className="space-y-5">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            {LABELS.columnProfile}
                        </h3>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {stats.columnProfiles.map((column) => (
                                <div
                                    key={column.key}
                                    className="rounded-2xl border border-slate-200 px-4 py-4"
                                >
                                    <div className="text-sm font-semibold text-slate-900">
                                        {column.label}
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                            {LABELS.valueType}: {column.type}
                                        </span>
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                            {LABELS.count}: {column.count.toLocaleString()}
                                        </span>
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                                            {LABELS.missing}: {column.missingCount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            {LABELS.numericSummary}
                        </h3>
                        {stats.numericColumns.length === 0 ? (
                            <p className="mt-4 text-sm text-slate-500">{LABELS.emptyStats}</p>
                        ) : (
                            <div className="mt-4 grid gap-3">
                                {stats.numericColumns.map((column) => (
                                    <div
                                        key={column.key}
                                        className="rounded-2xl border border-slate-200 px-4 py-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="text-sm font-semibold text-slate-900">
                                                {column.label}
                                            </div>
                                            <div className="flex gap-2 text-xs">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                                    {LABELS.count} {column.count.toLocaleString()}
                                                </span>
                                                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">
                                                    {LABELS.missing} {column.missingCount.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                                            <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm">
                                                <div className="text-slate-400">{LABELS.average}</div>
                                                <div className="mt-1 font-semibold text-slate-800">
                                                    {column.average.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm">
                                                <div className="text-slate-400">{LABELS.min}</div>
                                                <div className="mt-1 font-semibold text-slate-800">
                                                    {formatValue(column.min)}
                                                </div>
                                            </div>
                                            <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm">
                                                <div className="text-slate-400">{LABELS.max}</div>
                                                <div className="mt-1 font-semibold text-slate-800">
                                                    {formatValue(column.max)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="text-xs font-semibold text-slate-400">
                                                {LABELS.histogram}
                                            </div>
                                            <div className="mt-3 grid gap-2">
                                                {column.histogram.map((bin) => {
                                                    const maxCount =
                                                        Math.max(
                                                            ...column.histogram.map((item) => item.count)
                                                        ) || 1;
                                                    const ratio = (bin.count / maxCount) * 100;

                                                    return (
                                                        <div key={`${column.key}-${bin.label}`}>
                                                            <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                                                                <span>{bin.label}</span>
                                                                <span>{bin.count.toLocaleString()}</span>
                                                            </div>
                                                            <div className="h-2 rounded-full bg-slate-100">
                                                                <div
                                                                    className="h-2 rounded-full bg-slate-900"
                                                                    style={{ width: `${ratio}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                        <h3 className="text-sm font-semibold text-slate-900">
                            {LABELS.categoricalSummary}
                        </h3>
                        {stats.categoricalColumns.length === 0 ? (
                            <p className="mt-4 text-sm text-slate-500">{LABELS.emptyStats}</p>
                        ) : (
                            <div className="mt-4 grid gap-3">
                                {stats.categoricalColumns.map((column) => (
                                    <div
                                        key={column.key}
                                        className="rounded-2xl border border-slate-200 px-4 py-4"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="text-sm font-semibold text-slate-900">
                                                {column.label}
                                            </div>
                                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                                                {LABELS.missing} {column.missingCount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                            <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm">
                                                <div className="text-slate-400">{LABELS.unique}</div>
                                                <div className="mt-1 font-semibold text-slate-800">
                                                    {column.uniqueCount.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="rounded-xl bg-slate-50 px-3 py-3 text-sm">
                                                <div className="text-slate-400">{LABELS.sample}</div>
                                                <div className="mt-1 font-semibold text-slate-800">
                                                    {column.sample || '-'}
                                                </div>
                                            </div>
                                        </div>
                                        {column.topValues.length > 0 ? (
                                            <div className="mt-4">
                                                <div className="text-xs font-semibold text-slate-400">
                                                    {LABELS.topValues}
                                                </div>
                                                <div className="mt-3 space-y-2">
                                                    {column.topValues.map(([value, count]) => {
                                                        const maxCount = column.topValues[0]?.[1] ?? 1;
                                                        const ratio = maxCount === 0 ? 0 : (count / maxCount) * 100;

                                                        return (
                                                            <div key={`${column.key}-${value}`}>
                                                                <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                                                                    <span>{value}</span>
                                                                    <span>{count.toLocaleString()}</span>
                                                                </div>
                                                                <div className="h-2 rounded-full bg-slate-100">
                                                                    <div
                                                                        className="h-2 rounded-full bg-slate-900"
                                                                        style={{ width: `${ratio}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
