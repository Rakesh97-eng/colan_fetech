import {Component } from "react";
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      console.log("errorrr",error);
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <p>Something went wrong.</p>;
      }
      else{
        return this.props.children;
      }
    }
  }

  export default ErrorBoundary;