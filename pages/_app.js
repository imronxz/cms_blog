import { useState, useEffect } from 'react';

//! Components Layout
import { Layout } from '../components';

//! Styles
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
