import React, { ComponentType, useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { useViewStyles } from '../../hooks';

/*
 * Importa a lib de forma inline e opcional para não obrigar os demais repositórios
 * a instalarem o também.
 */
// @ts-ignore
type WebViewProps = import('react-native-webview').WebViewProps;
// @ts-ignore
type WebViewProgressEvent = import('react-native-webview/lib/WebViewTypes').WebViewProgressEvent;
let RNWebView: ComponentType<WebViewProps>;
/* istanbul ignore next */
try {
  if (require('react-native-webview')) {
    RNWebView = require('react-native-webview').default;
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

export type WebViewPageChangeEventType = {
  title: string;
  url: string;
};

export type WebViewPropsType = WebViewProps & {
  renderLoading?: () => React.ReactNode;
  onPageChange?: (event: WebViewPageChangeEventType) => void;
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

const WebView: React.FC<WebViewPropsType> = ({
  renderLoading, style, onPageChange, onLoadProgress, ...others
}) => {
  const lastLoadedUrl = useRef<string>();

  const renderLoadingView = useCallback(() => {
    if (!renderLoading) return <View />;

    return (
      <View
        style={StyleSheet.absoluteFill}
      >
        {renderLoading()}
      </View>
    );
  }, [renderLoading]);

  const handleLoadProgress = useCallback((event: WebViewProgressEvent) => {
    onLoadProgress?.(event);

    const isPageChanged = lastLoadedUrl.current !== event.nativeEvent.url
      && event.nativeEvent.progress === 1;

    if (isPageChanged) {
      onPageChange?.({
        title: event.nativeEvent.title,
        url: event.nativeEvent.url,
      });

      lastLoadedUrl.current = event.nativeEvent.url;
    }
  }, [onLoadProgress, onPageChange]);

  const webViewStyles = useViewStyles(() => [
    styles.webView,
    style,
  ], [style]);

  return (
    <RNWebView
      startInLoadingState
      {...others}
      style={webViewStyles}
      renderLoading={renderLoadingView}
      onLoadProgress={handleLoadProgress}
    />
  );
};

export default WebView;
