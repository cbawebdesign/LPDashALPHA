import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const CapitalAccounts = dynamic(
  () => import('~/components/capitalaccount/capitalaccounts'),
  {
    ssr: false,
  }
);

const CapitalAccount = () => {
    return (
      <RouteShell title={'Capital Account'}>
        <CapitalAccounts/>
      </RouteShell>
    );
  };

export default CapitalAccount;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
