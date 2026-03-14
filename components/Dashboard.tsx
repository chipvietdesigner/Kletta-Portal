import React from 'react';
import { TrendUp, ArrowDown, CurrencyDollar } from '@phosphor-icons/react';
import { DashboardData } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface DashboardProps {
  data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);

  // Prepare data for the chart - making expenses negative for the visual effect in the screenshot
  const chartData = data.chart.map(item => ({
    name: `${item.month} 2025`,
    income: item.income,
    expenses: -item.expenses, // Negative to show below the line
  }));

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-8 bg-white">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F2F33]">Dashboard</h1>
      </div>

      {/* KPI Cards - Reverted to previous style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Income Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#166534] flex-shrink-0">
            <TrendUp size={24} weight="fill" />
          </div>
          <div>
            <div className="text-[13px] text-[#616A6B] font-medium">Total Income</div>
            <div className="text-2xl font-bold text-[#000000] mt-0.5">{formatCurrency(data.kpi.income)}</div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#991B1B] flex-shrink-0">
            <ArrowDown size={24} weight="fill" />
          </div>
          <div>
            <div className="text-[13px] text-[#616A6B] font-medium">Total Expenses</div>
            <div className="text-2xl font-bold text-[#000000] mt-0.5">{formatCurrency(data.kpi.expenses)}</div>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1E40AF] flex-shrink-0">
            <CurrencyDollar size={24} weight="fill" />
          </div>
          <div>
            <div className="text-[13px] text-[#616A6B] font-medium">Net Profit</div>
            <div className={`text-2xl font-bold mt-0.5 ${data.kpi.profit >= 0 ? 'text-[#000000]' : 'text-red-600'}`}>
              {formatCurrency(data.kpi.profit)}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <h2 className="text-[16px] font-bold text-[#000000]">Summary</h2>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#374151', fontSize: 12, fontWeight: 400 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#374151', fontSize: 12, fontWeight: 400 }}
              tickFormatter={(value) => value < 0 ? `-€${Math.abs(value).toLocaleString()}` : `€${value.toLocaleString()}`}
            />
            <Tooltip 
              cursor={{ fill: '#F7F6EE' }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: '1px solid #E5E7EB', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              labelStyle={{ color: '#000000', fontWeight: 600, marginBottom: '4px' }}
              itemStyle={{ color: '#000000', fontWeight: 400, fontSize: '13px' }}
              formatter={(value: number) => [formatCurrency(Math.abs(value)), value > 0 ? 'Income' : 'Expenses']}
            />
            <Bar dataKey="income" fill="#F7D84A" radius={[4, 4, 0, 0]} barSize={40} />
            <Bar dataKey="expenses" fill="#E5E7EB" radius={[0, 0, 4, 4]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;