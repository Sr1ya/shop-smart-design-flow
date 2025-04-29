
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import CategorySection from '@/components/home/CategorySection';
import TrendingProducts from '@/components/home/TrendingProducts';

export default function Index() {
  return (
    <Layout>
      <HeroBanner />
      <CategorySection />
      <TrendingProducts />
    </Layout>
  );
}
