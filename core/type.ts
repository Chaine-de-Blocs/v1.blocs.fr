import type { File } from "./files";

export interface LayoutProps {
    file: File;
    title: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    categories?: string;
    css?: string;
    js?: string;
    banner?: string;
    primary?: string;
    children: JSX.Element;
}