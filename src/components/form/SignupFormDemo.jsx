import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/CustomInput/Label';
import { Input } from '@/components/CustomInput/Input';
import Section from '@/components/section/Section';
import { Link, useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import svg from '../../assets/placeholder.svg';

export function SignupFormDemo() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: null,
    timezone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleTimezoneChange = (value) => {
    setFormData({ ...formData, timezone: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted', formData);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(formData, null, 2)}</code>
          </pre>
        ),
      });
    }
  };

  const validateForm = () => {
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.dob || !formData.timezone) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required, including timezone.',
      });
      return false;
    }
    return true;
  };

  const handleNavigate = () => {
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleSignupSuccess = (credentialResponse) => {
    setLoading(true);
    console.log(credentialResponse);
    const result = jwtDecode(credentialResponse.credential);
    console.log(result);
    login(result);
    handleNavigate();
  };

  const handleSignupError = () => {
    console.log('Sign Up Failed');
    setLoading(false);
  };

  return (
    <Section className=''>
      <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]'>
        <div className='flex items-center justify-center py-12'>
          <div className='mx-auto grid w-[90%] max-w-[480px] gap-6 border border-white/20 p-5 rounded-lg'>
            <div className='grid gap-2 text-center'>
              <h2 className='font-semibold text-xl text-neutral-800 dark:text-neutral-200'>Welcome to FnPersona</h2>
              <p className='text-neutral-700 text-sm max-w-sm mt-2 text-center mx-auto dark:text-neutral-400'>
                SignUp to FnPersona to manage your Finance solutions
              </p>
            </div>
            <form className='my-2 space-y-8' onSubmit={handleSubmit}>
              <div className='flex flex-col md:flex-row gap-5 mb-4'>
                <LabelInputContainer>
                  <Label htmlFor='firstname'>First name</Label>
                  <Input
                    id='firstname'
                    name='firstname'
                    placeholder='Tyler'
                    type='text'
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='lastname'>Last name</Label>
                  <Input
                    id='lastname'
                    name='lastname'
                    placeholder='Durden'
                    type='text'
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className='mb-4'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='projectmayhem@fc.com'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className='mb-4'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  placeholder='••••••••'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </LabelInputContainer>

              <div className='flex flex-col'>
                <Label htmlFor='dob'>Date of birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={`w-full mt-2 pl-3 text-left font-normal ${!formData.dob && 'text-muted-foreground'}`}
                    >
                      {formData.dob ? format(formData.dob, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0 bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10 backdrop-blur-lg border border-black border-opacity-30 dark:border-white dark:border-opacity-30 text-black dark:text-white rounded-lg z-50 '
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={formData.dob}
                      onSelect={handleDateChange}
                      className='rounded-md border'
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className='text-[12px] text-neutral-600 text-center mt-2'>Your date of birth is used to calculate your age.</p>
              </div>
              <div>
                <Select onValueChange={handleTimezoneChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a timezone' />
                  </SelectTrigger>
                  <SelectContent className='bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10 backdrop-blur-lg border border-black border-opacity-30 dark:border-white dark:border-opacity-30 text-black dark:text-white rounded-lg'>
                    <SelectGroup>
                      <SelectLabel>North America</SelectLabel>
                      <SelectItem value='est'>Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value='cst'>Central Standard Time (CST)</SelectItem>
                      <SelectItem value='mst'>Mountain Standard Time (MST)</SelectItem>
                      <SelectItem value='pst'>Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value='akst'>Alaska Standard Time (AKST)</SelectItem>
                      <SelectItem value='hst'>Hawaii Standard Time (HST)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Europe & Africa</SelectLabel>
                      <SelectItem value='gmt'>Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value='cet'>Central European Time (CET)</SelectItem>
                      <SelectItem value='eet'>Eastern European Time (EET)</SelectItem>
                      <SelectItem value='west'>Western European Summer Time (WEST)</SelectItem>
                      <SelectItem value='cat'>Central Africa Time (CAT)</SelectItem>
                      <SelectItem value='eat'>East Africa Time (EAT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Asia</SelectLabel>
                      <SelectItem value='msk'>Moscow Time (MSK)</SelectItem>
                      <SelectItem value='ist'>India Standard Time (IST)</SelectItem>
                      <SelectItem value='cst_china'>China Standard Time (CST)</SelectItem>
                      <SelectItem value='jst'>Japan Standard Time (JST)</SelectItem>
                      <SelectItem value='kst'>Korea Standard Time (KST)</SelectItem>
                      <SelectItem value='ist_indonesia'>Indonesia Central Standard Time (WITA)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Australia & Pacific</SelectLabel>
                      <SelectItem value='awst'>Australian Western Standard Time (AWST)</SelectItem>
                      <SelectItem value='acst'>Australian Central Standard Time (ACST)</SelectItem>
                      <SelectItem value='aest'>Australian Eastern Standard Time (AEST)</SelectItem>
                      <SelectItem value='nzst'>New Zealand Standard Time (NZST)</SelectItem>
                      <SelectItem value='fjt'>Fiji Time (FJT)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>South America</SelectLabel>
                      <SelectItem value='art'>Argentina Time (ART)</SelectItem>
                      <SelectItem value='bot'>Bolivia Time (BOT)</SelectItem>
                      <SelectItem value='brt'>Brasilia Time (BRT)</SelectItem>
                      <SelectItem value='clt'>Chile Standard Time (CLT)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {loading && <p>loading</p>}
              <button
                className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
                type='submit'
              >
                Sign up &rarr;
                <BottomGradient />
              </button>
            </form>
            <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full' />
            <div className='flex flex-col space-y-4'>
              <div className='text-center mx-auto'>
                <GoogleLogin
                  buttonText='Sign Up'
                  width={700}
                  onSuccess={handleSignupSuccess}
                  onError={handleSignupError}
                />
              </div>
              <p className='text-sm text-center'>
                By clicking the button above, you agree to our <br />{' '}
                <span className='text-blue-400 cursor-pointer hover:text-blue-500'>Terms of Use and Privacy Policy</span>
              </p>
              <p className='text-sm text-center'>
                Already have an account?{' '}
                <Link to='/signin' className='text-blue-400 cursor-pointer hover:text-blue-500'>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className='hidden lg:block bg-muted'>
          <img
            src={svg}
            alt='image'
            width='1920'
            height='1080'
            className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
          />
        </div>
      </div>
    </Section>
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
  return <div className={`flex flex-col space-y-2 w-full ${className}`}>{children}</div>;
};
