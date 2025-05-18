declare module 'react-virtualized-auto-sizer' {
  import * as React from 'react';

  interface Size {
    height: number;
    width: number;
  }

  interface AutoSizerProps {
    children: (size: Size) => React.ReactNode;
    className?: string;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    onResize?: (size: Size) => void;
    style?: React.CSSProperties;
  }

  export default class AutoSizer extends React.Component<AutoSizerProps, {}> {}
} 