'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';
import { useLocale } from 'next-intl';

export default function StudioPage() {
  const locale = useLocale();
  
  // We override the basePath dynamically so that the Studio router
  // is aware of the Next-Intl [locale] prefix.
  const studioConfig = {
    ...config,
    basePath: `/${locale}/creator/studio`,
  };

  return (
    <div className="h-screen w-full relative z-50">
      {/* We render the Studio in a full viewport container */}
      <NextStudio config={studioConfig} />
    </div>
  );
}
