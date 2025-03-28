'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type SalesData = {
    salesData: { month: string; totalSales: number }[]
}
const Charts = ({ data: { salesData } }: { data: SalesData }) => {
    return (<ResponsiveContainer width='100%' height={350}>
        <BarChart
            data={salesData}
        >
            <XAxis dataKey="month" stroke='#8888' fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke='#8888' fontSize={12} tickLine={false} axisLine={false}
                tickFormatter={(value) => (`$${value}`)} />

            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="currenColor" radius={[40, 40, 0, 0]} className='fill-primary' />
        </BarChart>
    </ResponsiveContainer>);
}

export default Charts;

