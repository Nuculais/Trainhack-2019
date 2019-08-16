import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    render: PropTypes.func,
    children: PropTypes.node,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    console.group('ErrorBoundary');
    console.error(error);
    console.error(errorInfo);
    console.groupEnd();

    this.setState(() => ({
      error,
      errorInfo,
    }));
  }

  render() {
    const {
      render,
      children,
    } = this.props;

    const {
      error,
      errorInfo,
    } = this.state;

    if (error && render) {
      console.warn({
        render
      });

      return render(error, errorInfo);
    } else if (error || !children) {
      return null;
    }

    return children;
  }
}
