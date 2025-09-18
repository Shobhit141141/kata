import { Component } from "react";
import { Alert } from "@mantine/core";
import { GoAlertFill } from "react-icons/go";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {}

   getCleanStack(error) {
    if (!error?.stack) return null;
    const lines = error.stack.split("\n");
    return [lines[0], lines[1]?.trim()].filter(Boolean).join("\n");
  }


  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <Alert color="red" variant={"light"} className="w-[400px]" title="An error occurred" icon={<GoAlertFill />}>
            {this.state.error?.message || "Something went wrong."}
            {this.getCleanStack(this.state.error) && (
              <pre className="mt-2 text-xs whitespace-pre-wrap">
                {this.getCleanStack(this.state.error)}
              </pre>
            )}
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}
