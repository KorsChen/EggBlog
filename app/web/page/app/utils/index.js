// internal
import checkImageUrlIsValid from './internal/check-image-url-is-valid';
import delay from './internal/delay';
import exportFile from './internal/export-file';
import generateTimeString from './internal/time-string-generator';
import ScrollToTop from './internal/ScrollToTop';
import React, { lazy, Suspense } from 'react';

// external
import MarkdownParser from './external/markdown-parser';
import { unsplash, toJson } from './external/unsplash-service';

const generateStyledHTML = () => {
  return lazy(() => import('./internal/styled-html-generator'));
}

export {
  checkImageUrlIsValid,
  delay,
  exportFile,
  generateStyledHTML,
  generateTimeString,
  MarkdownParser,
  ScrollToTop,
  toJson,
  unsplash
}
