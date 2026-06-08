import { Component, ErrorInfo } from 'react'

/**
 * @description A generic class component wrapper to catch and display errors in its children.
 * This acts as an Error Boundary for the application's UI components.
 * @param {Object} props - Standard component props.
 */
class ErrorBoundary extends Component<any, any> {
  state: { hasError: boolean; error: Error | null };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error: new Error('Component failed to render.') };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an external logging service here (e.g., Sentry).
    console.error("Caught component rendering error:", error, errorInfo);
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg m-4" role="alert">
          <h3 className="font-bold">Application Error Encountered</h3>
          <p>Something went wrong while rendering this part of the page. We have logged the error.</p>
          {/* Optionally display a unique error ID for support */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;