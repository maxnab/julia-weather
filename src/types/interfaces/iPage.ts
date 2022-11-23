import type { ReactNode } from 'react';
import type { IPagesProps } from './iPageProps';

interface IPage {
    name: string;
    position: number;
    component: (props: IPagesProps) => ReactNode;
}

export type { IPage };
