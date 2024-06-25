import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/CustomInput/Label";
import { Input } from "@/components/CustomInput/Input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Section from "@/components/section/Section";

import img1 from "@/assets/img-1.jpg";
import img2 from "@/assets/img-2.jpg";
import img3 from "@/assets/img-3.webp";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function SigninFormDemo() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.password
    ) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
      });
      return false;
    }
    return true;
  };

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <Section className="">
     
        <div className="flex items-center justify-center al py-12">
          <div className="mx-auto grid w-[90%] max-w-[480px] gap-6 border border-white/20 p-5 rounded-lg">
            <div className="grid gap-2 text-center">
              <h2 className="font-semibold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to FnPersona
              </h2>
              <p className="text-neutral-700 text-sm max-w-sm mt-2 text-center mx-auto dark:text-neutral-400">
                Signin to FnPersona to manage your Finance solutions
              </p>
            </div>
            <form className="my-2 space-y-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </LabelInputContainer>
        
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign in &rarr;
                <BottomGradient />
              </button>
            </form>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
            <div className="flex flex-col space-y-4">
              <div className="text-center mx-auto">
                <GoogleLogin
                  buttonText="Sign in"
                  width={700}
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    const result = jwtDecode(credentialResponse.credential);
                    console.log(result);
                    login(result);
                    handleNavigate();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              
            </div>
          </div>
        </div>
        <div className="hidden lg:block bg-muted"></div>
      
    </Section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
