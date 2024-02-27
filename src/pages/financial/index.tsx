import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { LayoutStyle } from '~/core/layout-style';

const Financials = dynamic(
  () => import('~/components/financial/financials'),
  {
    ssr: false,
  },
);

const Financial = () => {
  return (
    <RouteShell
      title={<Trans i18nKey={'common:DistributionsLabel'} />}
    >
      <Financials />
    </RouteShell>
  );
};

export default Financial;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
