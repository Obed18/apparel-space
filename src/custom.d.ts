declare module '*.css';

declare module '*.scss';

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

interface ImportMeta {
  readonly env: Record<string, string>;
}
