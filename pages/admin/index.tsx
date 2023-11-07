import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Fragment } from 'react';
const AdminWrapper = dynamic(
  () =>
    import('../../src/components/admin/wrapper').then(
      (module) => module.AdminWrapper
    ),
  {
    ssr: false,
  }
);

const Admin: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Trvia Bot - Asistente virtual</title>
        <link rel="icon" href="/assets/brand.jpeg" sizes="any" />
        <meta
          name="description"
          content="Trivia Bot es un asistente virtual destinado para aprender cosas nuevas"
          key="desc"
        />
        <meta property="og:title" content="Trivia Bot tu asistente Virtual" />{' '}
        <meta
          property="og:description"
          content="Trivia Bot es un asistente virtual destinado para aprender cosas nuevas"
        />
      </Head>
      <AdminWrapper />
    </Fragment>
  );
};

export default Admin;
