import ContentLayout from '@/components/layout/ContentLayout';
import Link from 'next/link';

export const metadata = {
    title: 'Help Centre - Plugify',
};

export default function HelpPage() {
    return (
        <ContentLayout title="Help Centre">
            <p>Welcome to Plugify Support. How can we help you today?</p>
            <ul style={{ marginTop: '20px', lineHeight: '2' }}>
                <li><Link href="/faqs" style={{ color: 'var(--sh-orange)' }}>Browse FAQs</Link></li>
                <li><Link href="/support/ticket" style={{ color: 'var(--sh-orange)' }}>Submit a Help Ticket</Link></li>
                <li><Link href="/returns" style={{ color: 'var(--sh-orange)' }}>Returns & Exchanges</Link></li>
                <li>Contact us at: <strong>support@plugify.com</strong></li>
            </ul>
        </ContentLayout>
    );
}
