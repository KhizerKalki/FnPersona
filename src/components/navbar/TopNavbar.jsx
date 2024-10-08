import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PanelLeft,
  Search,
  Home,
  DollarSign,
  GoalIcon,
  BriefcaseBusinessIcon,
  Calendar,
  Settings,
  Calculator,
  UsersIcon,
  HelpCircle
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '@/context/AuthContext';
import { ModeToggle } from '../theme/mode-toggle';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import logo from '../../assets/logo.svg';
import { GrTransaction } from 'react-icons/gr';
import CommandDialogComponent from '../searchbar/CommandDialogComponent';

function TopNavbar() {
  const { user, logout } = useAuth();

  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isCommandOpen, setCommandOpen] = useState(false);
  const location = useLocation();

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const currentPage = location.pathname.split('/').pop();

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const handleSearchFocus = () => {
    setCommandOpen(true);
  };

  return (
    <header className='sticky bg-transparent top-0 z-30 flex  h-14 items-center gap-4 border-b  px-4 sm:static sm:h-auto sm:border-0  sm:px-6 '>
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            className='sm:hidden dark:text-white'
          >
            <PanelLeft className='h-5 w-5 ' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              to='/'
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
              onClick={handleLinkClick}
            >
              <img
                src={logo}
                alt='FnPersona'
                className='h-6 w-6 transition-all group-hover:scale-110 dark:invert'
              />
              <span className='sr-only dark:text-white'>FnPersona</span>
            </Link>
            <Link
              to='/dashboard/lobby'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <Home className='h-5 w-5' />
              Dashboard
            </Link>

            <Link
              to='/dashboard/budget/overview'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <DollarSign className='h-5 w-5' />
              Budget
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link
                  to='/dashboard/goal'
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
                  onClick={handleLinkClick}
                >
                  <GoalIcon className='h-5 w-5' />
                  Goals
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to='/dashboard/goal/addgoal' onClick={handleLinkClick}>
                    Add Goal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to='/dashboard/goal/overviewgoal'
                    onClick={handleLinkClick}
                  >
                    Overview Goal
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to='/dashboard/transactions'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <GrTransaction className='h-5 w-5' />
              Transactions
            </Link>
            <Link
              to='/dashboard/investments'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <BriefcaseBusinessIcon className='h-5 w-5' />
              Investments
            </Link>
            <Link
              to='/dashboard/partnership'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <UsersIcon className='h-5 w-5' />
              Partnerships
            </Link>
            <Link
              to='/dashboard/recurring'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <Calendar className='h-5 w-5' />
              Recurring Expenses
            </Link>
            <Link
              to='/dashboard/retirement'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <Calculator className='h-5 w-5' />
              Retirement Planner
            </Link>

            <Link
              to='/dashboard/contact'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <HelpCircle className='h-5 w-5' />
              Contact Us
            </Link>

            <Link
              to='/dashboard/settings'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-white'
              onClick={handleLinkClick}
            >
              <Settings className='h-5 w-5' />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className='hidden md:flex'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='relative ml-auto flex-1 md:grow-0 flex items-center'>
      <div className='relative w-full md:w-[200px] lg:w-[336px]'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-white' />
        <Input
          type='search'
          placeholder='Search...'
          className='w-full rounded-lg bg-background pl-8 pr-20 dark:bg-black dark:text-white'
          onFocus={handleSearchFocus}
        />
        
          <div className="absolute right-0 top-0 h-full flex items-center pr-2">
            <CommandDialogComponent
              isOpen={isCommandOpen}
              setIsOpen={setCommandOpen}
            />
          </div>
      
      </div>
    </div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='overflow-hidden rounded-full'
          >
            <img
              src={user?.picture || '/placeholder-user.jpg'}
              width={36}
              height={36}
              alt='Avatar'
              className='overflow-hidden rounded-full'
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel className='cursor-pointer'>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>
            <Link to='/dashboard/settings'>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={handleLogoutClick}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleLogoutCancel}
              className='dark:text-white'
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}

export default TopNavbar;
