import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Eğer yükleme devam ediyorsa, yükleme göster
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    if (!user) {
        // Kullanıcının gitmeye çalıştığı sayfayı state'e kaydediyoruz
        return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }

    // Kullanıcı giriş yapmışsa, içeriği göster
    return children;
}