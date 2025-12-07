import React, { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => (
  <div style={{ padding: '20px', background: '#111', minHeight: '100vh', color: '#fff' }}>
    {children}
  </div>
);

export default Page;