import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import Offers from '@/components/home/Offers';
import Brands from '@/components/home/Brands';
import StatsBar from '@/components/home/StatsBar';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';

// Fetch products for "Recommended" and "New Arrivals" sections
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Simulate different product sets
  const recommendedProducts = products.slice(0, 5);
  const newArrivals = products.slice().reverse().slice(0, 5);

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Hero />

        <CategoryGrid />

        <section id="recommended" style={{ marginTop: '50px' }}>
          <div className="section-header">
            <h2>Recommended For You</h2>
            <Link href="/shop" className="view-all">View All {'>'}</Link>
          </div>
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {recommendedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        <section id="new-arrivals" style={{ marginTop: '50px' }}>
          <div className="section-header">
            <h2>New Arrivals</h2>
            <Link href="/shop" className="view-all">View All {'>'}</Link>
          </div>
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {newArrivals.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        <Brands />

        <Offers />

        <StatsBar />
      </div>

      <Footer />
    </main>
  );
}
