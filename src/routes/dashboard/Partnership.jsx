"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pie, PieChart, Sector } from 'recharts';
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Label } from '@/components/ui/label';

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

const Partnership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [partners, setPartners] = useState([]);
  const [position, setPosition] = useState("bottom");

  // States for DropdownMenuCheckboxItems
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPartner = {
      name: form.name.value,
      email: form.email.value,
    };
    setPartners([...partners, newPartner]);
    handleClose();
  };

  const TextareaWithButton = () => {
    return (
      <div className="grid w-full gap-2 ">
        <Textarea placeholder="Type your message here." className='dark:text-white'/>
        <Button>Send message</Button>
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="dark:text-white">Add Partner</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Add Partner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right dark:text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right dark:text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    className="col-span-3"
                    type="email"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleClose} className="dark:text-white">Cancel</Button>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="dark:text-white">Advanced Privacy Controls</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Settings</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className='dark:text-white'>Access Level</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">View-Only</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Edit Permissions</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Full Access</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className='dark:text-white'>Data Sharing Preferences</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Transactions
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                  >
                    Budget
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Goals
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleSettingsClose} className="dark:text-white">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Section */}
      <div className="bg-black text-white p-4 rounded-lg mt-4">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <Label>Total Shared Assets:</Label>
              <p>$800.00</p>
            </div>
            <div>
              <Label>Total Shared Liabilities:</Label>
              <p>$200.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Partner Sections */}
      <div className="flex flex-wrap gap-4 mt-4">
        {partners.map((partner, index) => (
          <Card key={index}>
            <CardHeader className="flex justify-between items-center pb-0">
              <div className="text-right">
                <CardTitle>{partner.name}</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}
                    activeIndex={0}
                    activeShape={({ outerRadius = 0, ...props }) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* TextareaWithButton Component */}

      <div className="flex gap-4 mt-4 ">
        
        <div className="flex-1">
          <TextareaWithButton/>
        </div>
        <div className="flex-1 bg-black text-white p-4 rounded-lg ">
          <Label className='dark:text-white'>Guidelines List:</Label>
          <ul className="list-disc pl-5 dark:text-white">
            <li>Step 1: Identify the Issue</li>
            <li>Step 2: Discuss with Partner</li>
            <li>Step 3: Explore Solutions</li>
            <li>Step 4: Agree on a Plan</li>
            <li>Step 5: Follow Up</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Partnership;
