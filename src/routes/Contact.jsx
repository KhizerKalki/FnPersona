import { Input } from "@/components/CustomInput/Input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/CustomInput/Label";
import Spline from "@splinetool/react-spline";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreement: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      agreement: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      description: `Thank you, ${formData.name}! We've received your message and will reach out to you at ${formData.email} as soon as possible.`,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    });
  };

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black overflow-hidden">
      {/* Spline background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          height: "1200px",
          transform: "translateX(-1%) translateY(-15%) scale(1)",
        }}
      >
        <Spline scene="https://prod.spline.design/bi0QpAoYBbXUaV-B/scene.splinecode" />
        <div className="absolute inset-0"></div>
      </div>

      {/* Contact form and details */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 backdrop-blur-md rounded-md shadow-lg w-3/4 mt-24 mb-8 border border-gray-200 dark:border-gray-800">
        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Contact Us
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm text-black dark:text-gray-300"
            >
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm text-black dark:text-gray-300"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="mail@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm text-black dark:text-gray-300"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm text-black dark:text-gray-300"
            >
              Message
            </Label>
            <Input
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="rows-10"
              as="textarea"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreement"
              className="text-white dark:text-gray-300"
              checked={formData.agreement}
              onCheckedChange={handleCheckboxChange}
              required
            />
            <Label
              htmlFor="agreement"
              className="text-xs text-black dark:text-gray-300"
            >
              I agree to the
              <button className="underline text-blue-500 dark:text-blue-400 ml-1">
                Terms & Conditions
              </button>
            </Label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            {" "}
            Submit
            <BottomGradient />
          </button>
        </form>
        {/* Contact details */}
        <div className="hidden lg:flex flex-col justify-center items-center space-y-12 text-gray-600 dark:text-gray-400">

           <Spline scene="https://prod.spline.design/2uaGd9F8XFKf-no5/scene.splinecode"
            style={{ transform: "translateY(2.5%) scale(0.8)" }}
          />
        </div>
      </div>
    </div>
  );
}
