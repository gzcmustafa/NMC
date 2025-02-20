import {createContext,useContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        checkAuth();
    },[]);

    const checkAuth = async () => {
        try{
            const token = localStorage.getItem('token');
            if(!token) {
                setLoading(false);
                return;
            }
            
            const response = await fetch('http://localhost:5000/api/auth/verify-token',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                logout();
            }
        }
        catch (error){
            console.error("Auth check failed:",error);
            logout();
        } finally {
            setLoading(false);        
        }
    };

    const login = async (email,password) => {
        try{
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);  
                setUser(data.user);                       
                navigate('/dashboard');              
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;  
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');  
        setUser(null);                    
        navigate('/');                    
    };

    return (
        <AuthContext.Provider value={{ 
            user,     
            loading,    
            login,      
            logout     
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);