export interface SubLink {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: any;
  subLinks?: SubLink[];
  isHash?: boolean;
}
