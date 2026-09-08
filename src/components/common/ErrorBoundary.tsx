import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex items-center justify-center h-full min-h-[200px] text-text-secondary">
          <div className="text-center">
            <div className="text-2xl mb-2">⚠</div>
            <div className="text-sm">3D scene unavailable</div>
            <div className="text-xs mt-1 opacity-60">WebGL may not be supported</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
