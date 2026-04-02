import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CNC Turning, VMC Milling Services | Microcut Technology Pune",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
