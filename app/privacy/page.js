import ContentLayout from '@/components/layout/ContentLayout';

export const metadata = {
    title: 'Privacy Policy - Plugify',
};

export default function PrivacyPage() {
    return (
        <ContentLayout title="Privacy Policy">
            <p>Last updated: January 2026</p>
            <h3>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, update your profile, request customer support, or otherwise communicate with us.</p>
            <h3>How We Use Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, such as to process transactions and send you related information, including confirmations and invoices.</p>
        </ContentLayout>
    );
}
