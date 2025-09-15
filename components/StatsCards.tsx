import React from 'react';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { QrCodeIcon } from './icons/QrCodeIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, description }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:-translate-y-1">
        <div className="bg-indigo-900/50 text-indigo-400 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h3 className="text-3xl font-bold text-slate-200">{title}</h3>
        <p className="text-slate-400 mt-1">{description}</p>
    </div>
);

export const StatsCards: React.FC = () => (
    <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
                icon={<UserGroupIcon className="w-8 h-8" />}
                title="2.6M+"
                description="Happy Customers"
            />
            <StatCard 
                icon={<QrCodeIcon className="w-8 h-8" />}
                title="5.1M+"
                description="Codes Generated"
            />
            <StatCard 
                icon={<ShieldCheckIcon className="w-8 h-8" />}
                title="99.9%"
                description="Uptime Guarantee"
            />
        </div>
    </section>
);