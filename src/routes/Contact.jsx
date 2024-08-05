import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center py-8 px-4 lg:px-8 lg:mt-14">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-lg bg-white dark:bg-black space-y-8 w-full max-w-lg"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Please fill the form below and we will get back to you as soon as
              possible.
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                className="text-lg text-gray-700 dark:text-gray-300"
                htmlFor="name"
              >
                Name
              </Label>
              <Input
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label
                className="text-lg text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label
                className="text-lg text-gray-700 dark:text-gray-300"
                htmlFor="phone"
              >
                Phone Number
              </Label>
              <Input
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-gray-100"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label
                className="text-lg text-gray-700 dark:text-gray-300"
                htmlFor="message"
              >
                Message
              </Label>
              <textarea
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-900 dark:text-gray-100 w-full p-3 rounded-md"
                id="message"
                placeholder="Type your message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                className="text-gray-700 dark:text-gray-300"
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <Label
                className="text-sm text-gray-700 dark:text-gray-300"
                htmlFor="agreement"
              >
                I agree to the
                <button className="underline text-blue-500 dark:text-blue-400 ml-1">
                  Terms & Conditions
                </button>
              </Label>
            </div>
            <Button
              className="w-full bg-gradient-to-br from-black dark:white dark:text-white to-neutral-600 text-white py-3 rounded-md hover:bg-blue-700"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden lg:flex lg:flex-1 items-center justify-center mt-40">
        <Spline scene="https://prod.spline.design/uYEIXEB-RKV1XPto/scene.splinecode" />
      </div>
    </div>
  );
}
