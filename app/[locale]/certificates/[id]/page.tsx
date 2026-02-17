import { CertificateView } from '@/components/certificate/CertificateView';
import { getCertificateById } from '@/lib/data/certificates';
import { notFound } from 'next/navigation';

interface CertificatePageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = await params;
  const certificate = getCertificateById(id);

  if (!certificate) {
    notFound();
  }

  return <CertificateView certificate={certificate} />;
}
