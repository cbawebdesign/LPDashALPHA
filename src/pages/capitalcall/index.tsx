import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const CapitalCalls = dynamic(
  () => import('~/components/capitalcall/capitalcalls'),
  {
    ssr: false,
  }
);

const CapitalCall = () => {
    return (
      <RouteShell title={'Capital Calls'}>
        <CapitalCalls/>
      </RouteShell>
    );
  };

export default CapitalCall;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
