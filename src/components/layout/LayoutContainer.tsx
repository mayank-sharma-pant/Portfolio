'use client';

import React from 'react';

export default function LayoutContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[1280px] mx-auto px-8 min-w-0 ${className}`}>
      {children}
    </div>
  );
}

