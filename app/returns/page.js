import ContentLayout from '@/components/layout/ContentLayout';

export const metadata = {
    title: 'Returns Policy - Plugify',
};

export default function ReturnsPage() {
    return (
        <ContentLayout title="Returns Policy">
            <h3>30-Day Money Back Guarantee</h3>
            <p>If you are not 100% satisfied with your purchase, you can return the product and get a full refund or exchange the product for another one, be it similar or not.</p>
            <p>You can return a product for up to 30 days from the date you purchased it.</p>
            <p>Any product you return must be in the same condition you received it and in the original packaging. Please keep the receipt.</p>
        </ContentLayout>
    );
}
