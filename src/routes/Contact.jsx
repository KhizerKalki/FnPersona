import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black overflow-hidden">
      {/* Spline background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          height: "900px",
          transform: "translateX(-5%) translateY(-5%) scaleX(1.6) scaleY(1.5)",
        }}
      >
        <Spline scene="https://prod.spline.design/BejJBEBM7q5W2FKv/scene.splinecode" />
        <div className="absolute inset-0"></div>
      </div>

      {/* Contact form and details */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 backdrop-blur-md rounded-md shadow-lg w-3/4 mt-20 border border-black dark:border-white">
        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Contact Us
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-base text-black dark:text-gray-300"
            >
              Name
            </Label>
            <Input
              id="name"
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm text-gray-900 dark:text-gray-100 w-full"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-base text-black dark:text-gray-300"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm text-gray-900 dark:text-gray-100 w-full"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-base text-black dark:text-gray-300"
            >
              Phone Number
            </Label>
            <div className="relative">
              <Input
                id="phone"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm text-gray-900 dark:text-gray-100 w-full"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-base text-black dark:text-gray-300"
            >
              Message
            </Label>
            <textarea
              id="message"
              className="dark:border-custom-border rounded-md border border-1 bg-white dark:bg-black text-sm text-gray-900 dark:text-gray-100 w-full p-2 rounded-md"
              placeholder="Type your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
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
          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-black dark:from-neutral-500 dark:to-black to-neutral-600 text-sm dark:text-white py-2 rounded-md"
          >
            Submit
          </Button>
        </form>
        {/* Contact details */}
        <div className="hidden lg:flex flex-col justify-center items-center space-y-12 text-gray-600 dark:text-gray-400">
          <div className="flex flex-col items-center space-y-4">
            <FaPhone className="text-black dark:text-gray-300 w-28 h-28" />
            <span className="text-black dark:text-gray-300">987654321</span>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <FaEnvelope className="text-black dark:text-gray-300 w-28 h-28" />
            <span className="text-black dark:text-gray-300">abc@.gmailcom</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <FaFacebook className="hover:text-blue-600 text-black dark:text-white transition-colors duration-200 w-8 h-8" />
            <FaTwitter className="hover:text-blue-400 text-black dark:text-white transition-colors duration-200 w-8 h-8" />
            <FaLinkedin className="hover:text-blue-700 text-black dark:text-white transition-colors duration-200 w-8 h-8" />
            <FaInstagram className="hover:text-pink-500 text-black dark:text-white transition-colors duration-200 w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
