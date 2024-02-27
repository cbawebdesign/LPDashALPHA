import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { LayoutStyle } from '~/core/layout-style';

const KOnes = dynamic(
    () => import('~/components/kone/kones'),
    {
      ssr: false,
    },
  );
  

const  kone= () => {
  return (
    <RouteShell
      title={<Trans i18nKey={'common:DistributionsLabel'} />}
    >
      <KOnes />
    </RouteShell>
  );
};

export default kone;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
