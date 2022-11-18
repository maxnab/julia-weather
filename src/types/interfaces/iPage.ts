import { ReactNode } from 'react';
import { IPagesProps } from './iPageProps';

interface IPage {
    name: string;
    position: number;
    component: (props: IPagesProps) => ReactNode;
}

export type { IPage };
