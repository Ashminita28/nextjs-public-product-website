import {
  Users,
  Bell,
  TrendingUp,
  BarChart,
  Eye,
  Zap,
  Globe,
  Database,
  Briefcase,
  Share,
  Link,
} from './icons';
import { DM_Sans, DM_Mono } from 'next/font/google';
import { IconType } from './types/shared-types';

/* UI MAPPING With Dashboard*/
export const iconMap: Record<string, IconType> = {
  'Flights Processed': Users,
  'Delay Reduction': TrendingUp,
  'Data Accuracy': Bell,
};

export const colorMap: Record<string, string> = {
  'Flights Processed': 'border-blue-100 bg-blue-50 text-primary',
  'Delay Reduction': 'border-emerald-100 bg-emerald-50 text-emerald-600',
  'Data Accuracy': 'border-violet-100 bg-violet-50 text-violet-600',
};

export const icons = [BarChart, Eye, Zap, Globe, Database, Users, Briefcase];
export const iconColors = [
  'border-blue-100 bg-blue-50 text-primary',
  'border-violet-100 bg-violet-50 text-violet-600',
  'border-emerald-100 bg-emerald-50 text-emerald-600',
  'border-amber-100 bg-amber-50 text-amber-600',
  'border-sky-100 bg-sky-50 text-sky-600',
  'border-rose-100 bg-rose-50 text-rose-600',
];

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export const planPerks = [
  ['Up to 5 users', 'Real-time tracking', 'Email support'],
  ['Up to 25 users', 'Advanced analytics', 'Priority support', 'API access'],
  ['Unlimited users', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee'],
];

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinks = Record<string, FooterLink[]>;

export const footerLinks: FooterLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Capabilities', href: '/#capabilities' },
    { label: 'Modules', href: '/#modules' },
    { label: 'Pricing', href: '/pricing' },
  ],

  Company: [
    { label: 'Blog', href: '/blog' },
  ],

};

type Social = {
  label: string;
  href: string;
  icon: IconType;
};

export const socials: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/your-org',
    icon: Share,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/your-org',
    icon: Share,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/your-org',
    icon: Link,
  },
];
