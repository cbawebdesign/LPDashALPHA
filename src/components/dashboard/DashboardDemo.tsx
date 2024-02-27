import { Line, ResponsiveContainer, LineChart, XAxis } from 'recharts';
import { useMemo } from 'react';

import Tile from '~/core/ui/Tile';
import LogoImage from '~/core/ui/Logo/LogoImage';
import loadingGif from './newmaker/new/public/assets/images/loaderr.gif'; // Import your gif

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

export default function DashboardDemo() {


  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-6 space-y-6">
      <LogoImage style={{ width: '150px', height: '100px' }} />
      <h1 className="text-2xl font-bold mb-4">Digital Alpha Limited Partner Dashboard</h1>
      <img src="./newmaker/new/public/assets/images/loaderr.gif" alt="Animated content" className="mb-4" />
      <p className="text-center max-w-prose">
        This is a paragraph section. You can put any content you want here.
      </p>
    </div>
  );
}
