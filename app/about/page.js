import ContentLayout from '@/components/layout/ContentLayout';

export default function About() {
    return (
        <ContentLayout title="Empowering Your Tech Life">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.8' }}>
                    Plugify isn't just a store; it's a curated experience for the modern enthusiast.
                    We verify, test, and hand-pick every gadget to ensure it meets our rigorous standards of quality and innovation.
                </p>
            </div>

            <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '15px',
                overflow: 'hidden',
                marginBottom: '50px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                <img
                    src="https://images.unsplash.com/photo-1531297461136-82lw9f5b2fa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Team Plugify"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', textAlign: 'left' }}>
                <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ color: 'var(--sh-orange)', marginBottom: '15px', fontWeight: 'bold' }}>Our Mission</h3>
                    <p style={{ color: '#666' }}>To democratize access to high-end technology with transparent pricing and expert support.</p>
                </div>
                <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ color: 'var(--sh-blue)', marginBottom: '15px', fontWeight: 'bold' }}>Our Promise</h3>
                    <p style={{ color: '#666' }}>Every product is authentic, brand new, and comes with a manufacturer warranty.</p>
                </div>
                <div style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ color: '#10b981', marginBottom: '15px', fontWeight: 'bold' }}>Sustainability</h3>
                    <p style={{ color: '#666' }}>We aim to reduce e-waste by offering trade-in programs and eco-friendly packaging.</p>
                </div>
            </div>
        </ContentLayout>
    );
}
