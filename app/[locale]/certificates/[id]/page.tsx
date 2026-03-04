/**
 * @fileoverview Certificate detail page.
 * Fetches and displays a specific certificate by its ID (mock or on-chain).
 */

import { notFound } from "next/navigation";
import { CertificateView } from "@/components/certificate/CertificateView";
import { getCertificateById } from "@/lib/data/certificates";

interface CertificatePageProps {
	params: Promise<{
		locale: string;
		id: string;
	}>;
}

export default async function CertificatePage({
	params,
}: CertificatePageProps) {
	const { id } = await params;
	const certificate = await getCertificateById(id);

	if (!certificate) {
		notFound();
	}

	return <CertificateView certificate={certificate} />;
}
