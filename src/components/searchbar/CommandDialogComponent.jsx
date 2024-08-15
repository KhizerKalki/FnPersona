import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  Home,
  DollarSign,
  GoalIcon,
  BriefcaseBusinessIcon,
  UsersIcon,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function CommandDialogComponent({ isOpen, setIsOpen }) {
  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  return (
    <>
      <p className="text-sm text-muted-foreground dark:text-white/50">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/lobby" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard Lobby</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/budget/overview" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Budget Overview</span>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/transactions" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Transactions</span>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/investments" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <BriefcaseBusinessIcon className="mr-2 h-4 w-4" />
                <span>Investments</span>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/goal/overviewgoal" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <GoalIcon className="mr-2 h-4 w-4" />
                <span>Goals Overview</span>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/partnership" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <UsersIcon className="mr-2 h-4 w-4" />
                <span>Partnerships</span>
              </CommandItem>
            </NavLink>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tools">
            <NavLink to="/dashboard/recurring" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Recurring Expenses</span>
              </CommandItem>
            </NavLink>
            <NavLink to="/dashboard/retirement" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <Calculator className="mr-2 h-4 w-4" />
                <span>Retirement Planner</span>
              </CommandItem>
            </NavLink>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <NavLink to="/dashboard/settings" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)}>
              <CommandItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Contact</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
            </NavLink>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default CommandDialogComponent;
