import ContentLayout from '@/components/layout/ContentLayout';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Contact() {
    return (
        <ContentLayout title="Get in Touch">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ color: '#777' }}>Have a question? We'd love to hear from you.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                {/* Contact Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '15px', padding: '20px', background: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
                        <FiMapPin style={{ fontSize: '24px', color: 'var(--sh-orange)', marginTop: '5px' }} />
                        <div>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Visit Us</h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>123 Tech Avenue<br />Silicon Valley, CA 94025<br />United States</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', padding: '20px', background: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
                        <FiMail style={{ fontSize: '24px', color: 'var(--sh-orange)', marginTop: '5px' }} />
                        <div>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Email</h3>
                            <p style={{ color: '#666' }}>support@plugify.tech</p>
                            <p style={{ color: '#666' }}>sales@plugify.tech</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', padding: '20px', background: '#fff', borderRadius: '10px', border: '1px solid #eee' }}>
                        <FiPhone style={{ fontSize: '24px', color: 'var(--sh-orange)', marginTop: '5px' }} />
                        <div>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Call Us</h3>
                            <p style={{ color: '#666' }}>+1 (555) 123-4567</p>
                            <p style={{ color: '#666' }}>Mon - Fri: 9am - 6pm PST</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form style={{ background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Name</label>
                        <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9' }} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Message</label>
                        <textarea rows="5" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9', fontFamily: 'inherit' }} required></textarea>
                    </div>
                    <button style={{
                        width: '100%',
                        background: 'var(--sh-orange)',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.2s'
                    }}>
                        Send Message
                    </button>
                </form>
            </div>
        </ContentLayout>
    );
}
