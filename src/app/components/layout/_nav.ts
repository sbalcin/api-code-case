interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'API Reports'
  },
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-home'
  },
  {
    name: 'Transactions',
    url: '/transactions',
    icon: 'icon-notebook'
  },
  {
    name: 'Financial House',
    url: 'https://financialhouse.io/',
    icon: 'icon-layers',
    class: 'mt-auto',
    variant: 'success',
    attributes: {target: '_blank', rel: 'noopener'}
  }
];

