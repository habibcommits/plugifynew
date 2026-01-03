import ContentLayout from '@/components/layout/ContentLayout';

export const metadata = {
    title: 'FAQs - Plugify',
};

export default function FAQPage() {
    return (
        <ContentLayout title="Frequently Asked Questions">
            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3>How can I track my order?</h3>
                <p>Once your order has shipped, you will receive an email with a tracking number and a link to track your package.</p>
            </div>
            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3>What is your return policy?</h3>
                <p>We offer a 30-day return policy for most items. Products must be in their original condition and packaging.</p>
            </div>
            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3>Do you ship internationally?</h3>
                <p>Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.</p>
            </div>
            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3>What payment methods do you accept?</h3>
                <p>We accept major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay.</p>
            </div>
        </ContentLayout>
    );
}
