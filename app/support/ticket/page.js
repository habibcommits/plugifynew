import ContentLayout from '@/components/layout/ContentLayout';

export const metadata = {
    title: 'Submit a Ticket - Plugify',
};

export default function TicketPage() {
    return (
        <ContentLayout title="Submit a Help Ticket">
            <p>Please fill out the form below and our support team will get back to you within 24 hours.</p>
            <form style={{ display: 'grid', gap: '20px', maxWidth: '500px', marginTop: '30px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Name</label>
                    <input type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
                    <input type="email" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Issue Description</label>
                    <textarea rows="5" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}></textarea>
                </div>
                <button style={{
                    background: 'var(--sh-orange)',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Submit Ticket</button>
            </form>
        </ContentLayout>
    );
}
