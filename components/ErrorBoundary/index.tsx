import React from 'react'

class ErrorBoundary extends React.Component<any> {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: any) {
    console.log(error)
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div>
          <h2>Some Error</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again ?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default React.memo(ErrorBoundary)
