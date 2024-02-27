import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Trans } from 'next-i18next';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { LayoutStyle } from '~/core/layout-style';

const Communications = dynamic(
  () => import('~/components/communication/communications'),
  {
    ssr: false,
  },
);

const Communication = () => {
  return (
    <RouteShell
      title={<Trans i18nKey={'common:CommunicationsLabel'} />}
    >
      <Communications />
    </RouteShell>
  );
};

export default Communication;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
