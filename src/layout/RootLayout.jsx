import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
export default function RootLayout() {
  return (
    <div className='dark:text-white min-h-screen'>
      <nav>
        <Navbar />
      </nav>
      <div>
    
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
