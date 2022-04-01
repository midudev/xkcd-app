import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/react';
import '../styles/globals.css';
import { I18NProvider, useI18N } from 'context/i18n.js';

const DefaultHeadApp = () => {
  const {t} = useI18N()

  return (
    <Head>
      <title>{t('SEO_DEFAULT_TITLE')}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  )
}

export default MyApp
