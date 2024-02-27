import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { LayoutStyle } from '~/core/layout-style';

const DistributionsAll = dynamic(
  () => import('~/components/distributions/distributionsall'),
  {
    ssr: false,
  },
);

const Distributions = () => {
  return (
    <RouteShell
      title={<Trans i18nKey={'common:DistributionsLabel'} />}
    >
      <DistributionsAll />
    </RouteShell>
  );
};

export default Distributions;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
