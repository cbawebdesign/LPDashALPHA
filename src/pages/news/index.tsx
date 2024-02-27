import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { LayoutStyle } from '~/core/layout-style';

const AllNews = dynamic(
    () => import('~/components/news/allnews'),
    {
      ssr: false,
    },
  );
  

const  news= () => {
  return (
    <RouteShell
      title={<Trans i18nKey={'common:NewsLabel'} />}
    >
      <AllNews />
    </RouteShell>
  );
}


  export default news;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}

