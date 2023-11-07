import type { NextPage } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';

import { WithLayout } from '../src/hocs/WithLayout';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Anna - Nuestro Asistente virtual</title>
        <link rel="icon" href="/assets/brand.jpeg" sizes="any" />
        <meta
          name="description"
          content="Trivia Bot es un asistente virtual destinado para aprender cosas nuevas"
          key="desc"
        />
        <meta property="og:title" content="Trivia Bot tu asistente Virtual" />
        <meta
          property="og:description"
          content="Trivia Bot es un asistente virtual destinado para aprender cosas nuevas"
        />
      </Head>

      <div className="flex flex-col gap-20 md:gap-24"></div>
    </Fragment>
  );
};

export default WithLayout(Home);
