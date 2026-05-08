export type PreviewValue = string | number;

export type PreviewColumn = {
    key: string;
    label: string;
};

export type PreviewFile = {
    id: string;
    name: string;
    description?: string;
    columns: PreviewColumn[];
    rows: Array<Record<string, PreviewValue>>;
};

export type ChangeHistoryItem = {
    version: string;
    date: string;
    description: string;
};

export type DatasetItem = {
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
    source: string;
    updatedAt: string;
    organization: string;
    task: string;
    formats: string[];
    annotationFormat: string;
    serviceDomain: string[];
    buildScale: string;
    purpose: string;
    sampleNotice: string;
    changeHistory: ChangeHistoryItem[];
    previewColumns: PreviewColumn[];
    previewRows: Array<Record<string, PreviewValue>>;
    previewFiles?: PreviewFile[];
};

export type DatasetGroup = {
    competition: string;
    datasets: DatasetItem[];
};
