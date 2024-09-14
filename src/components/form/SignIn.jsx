import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '@/components/CustomInput/Label';
import { Input } from '@/components/CustomInput/Input';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/context/AuthContext';
import Loader from '../loader/Loader';
import { useToast } from '@/components/ui/use-toast';
import Spline from '@splinetool/react-spline';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth(); // Retrieve login function from context
  const navigate = useNavigate();

  const handleNavigate = () => {
    setLoading(false);
    navigate('/dashboard/lobby'); // Redirect to dashboard
  };

  const handleLoginSuccess = (credentialResponse) => {
    setLoading(true);
    const result = jwtDecode(credentialResponse.credential);
    login(result);
    handleNavigate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the JWT token in localStorage
        login(data); // Set user state
        toast({ title: 'Login successful!' });
        handleNavigate(); // Redirect to dashboard
      } else {
        toast({ variant: 'destructive', title: 'Error', description: data.message });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Login failed', description: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
      <div className='flex items-center justify-center py-12 w-full'>
        <form
          className='mx-auto grid w-full max-w-[350px] gap-6 p-4'
          onSubmit={handleSubmit}
        >
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-semibold'>Login</h1>
            <p className='text-balance text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <LabelInputContainer>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='mail@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LabelInputContainer>
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  to='/forgot-password'
                  className='ml-auto inline-block text-sm underline'
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loading && <Loader />}
            <button
              type='submit'
              className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            >
              Login
              <BottomGradient />
            </button>
            <GoogleLogin
              width={325}
              onSuccess={handleLoginSuccess}
              onError={() => setLoading(false)}
            />
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='underline'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <div className='hidden lg:block bg-muted'>
        <Spline scene="https://prod.spline.design/u5QTbeQqEBltnLMw/scene.splinecode" />
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};
