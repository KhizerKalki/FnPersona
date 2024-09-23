import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    console.log(email, password);
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        const user = {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          timezone: data.timezone,
        };
        setUser(user);
        toast({ title: "Login successful!" });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };
  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        const user = {
          firstname: result.user.firstname,
          lastname: result.user.lastname,
          email: result.user.email,
          dateOfBirth: result.user.dateOfBirth,
          timezone: result.user.timezone,
        };
        setUser(user);
        toast({
          title: "Signup successful!",
          description: "Redirecting to dashboard...",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: result.error || "An error occurred during signup.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
