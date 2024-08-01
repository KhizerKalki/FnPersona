import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TrendingUp, Settings } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ContributionTracking from '@/components/graph/client/ContributionTracking';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { SharedFinancial } from '@/components/graph/client/SharedFinancial';

const Partnership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [partners, setPartners] = useState([
    { name: 'Alice', email: 'alice@example.com', contribution: 500, color: '#4caf50', privacy: { showTransactions: true, hideSensitiveData: false }},
    { name: 'Bob', email: 'bob@example.com', contribution: 700, color: '#f44336', privacy: { showTransactions: true, hideSensitiveData: false }},
    { name: 'Charlie', email: 'charlie@example.com', contribution: 300, color: '#2196f3', privacy: { showTransactions: true, hideSensitiveData: false }},
  ]);
  const [accessLevel, setAccessLevel] = useState('view-only');

  const colors = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0'];

  const handleClose = () => setIsOpen(false);
  const handleSettingsClose = () => setIsSettingsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPartner = {
      name: form.name.value,
      email: form.email.value,
      contribution: Math.floor(Math.random() * 1000), // random contribution value for the demo
      color: colors[partners.length % colors.length],
      privacy: { showTransactions: true, hideSensitiveData: false }
    };
    setPartners([...partners, newPartner]);
    setIsOpen(false);
  };

  const handlePrivacyChange = (partnerName, key, value) => {
    setPartners((prevPartners) => 
      prevPartners.map((partner) => 
        partner.name === partnerName 
          ? { ...partner, privacy: { ...partner.privacy, [key]: value }}
          : partner
      )
    );
  };

  const TextareaWithButton = () => (
    <>
      <h1 className='dark:text-white ml-4 items-center justify-between mb-4'>
        Message Partner
      </h1>
      <div className='w-[50%] items-center justify-between p-2'>
        <Textarea
          placeholder='Type your message here.'
          className='dark:text-white w-[430px] mb-6'
        />
        <Button className='mr-[-200px] p-5'>Send message</Button>
      </div>
    </>
  );

  const DrawerDemo = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' className='dark:text-white'>
          Message
        </Button>
      </DrawerTrigger>
      <DrawerContent className='w-[500px] ml-14'>
        <TextareaWithButton />
      </DrawerContent>
    </Drawer>
  );

  const monthlyContributions = [
    { month: 'Jan', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
    { month: 'Feb', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
    { month: 'Mar', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
    { month: 'Apr', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
    { month: 'May', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
    { month: 'Jun', ...Object.fromEntries(partners.map(partner => [partner.name, partner.contribution])) },
  ];

  return (
    <div className='container'>
      <div className='gap-4'>
      
        <div className='header-section p-4 mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold dark:text-white'>
              Manage Partnership
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Manage your partnerships, invite new partners, set joint financial
              goals, and control privacy settings all in one place.
            </p>
          </div>
          <div className='flex items-center'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='dark:text-white'>
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='dark:text-white'>
                    Add Partner
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label
                        htmlFor='name'
                        className='text-right dark:text-white'
                      >
                        Name
                      </Label>
                      <Input
                        id='name'
                        name='name'
                        className='col-span-3 dark:text-white'
                      />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label
                        htmlFor='email'
                        className='text-right dark:text-white'
                      >
                        Email
                      </Label>
                      <Input
                        id='email'
                        name='email'
                        className='col-span-3 dark:text-white'
                        type='email'
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant='outline'
                      onClick={handleClose}
                      className='dark:text-white'
                    >
                      Cancel
                    </Button>
                    <Button type='submit'>Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <DrawerDemo />
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='dark:text-white'>
                  <Settings className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='dark:text-white'>Settings</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='dark:text-white'>
                        Access Level
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56'>
                      <DropdownMenuRadioGroup
                        value={accessLevel}
                        onValueChange={setAccessLevel}
                      >
                        <DropdownMenuRadioItem value='view-only'>
                          View-Only
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value='edit-permissions'>
                          Edit Permissions
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value='full-access'>
                          Full Access
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className='mt-4'>
                    <Label className='dark:text-white'>Advanced Privacy Controls:</Label>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Restrict access to specific financial data or features.
                    </p>
                    {partners.map((partner) => (
                      <div key={partner.name} className='mt-2'>
                        <h3 className='font-bold dark:text-white'>{partner.name}</h3>
                        <div className='flex items-center gap-2 mt-1'>
                          <Checkbox
                            checked={partner.privacy.showTransactions}
                            onCheckedChange={(checked) => handlePrivacyChange(partner.name, 'showTransactions', checked)}
                          />
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Show transactions
                          </Label>
                        </div>
                        <div className='flex items-center gap-2 mt-1'>
                          <Checkbox
                            checked={partner.privacy.hideSensitiveData}
                            onCheckedChange={(checked) => handlePrivacyChange(partner.name, 'hideSensitiveData', checked)}
                          />
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Hide sensitive data
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={handleSettingsClose}
                    className='dark:text-white'
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <SharedFinancial />
        <ContributionTracking partners={partners} monthlyContributions={monthlyContributions} />
      </div>

      {/* All Partners Contributions Table */}
      <div className='mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Partner Contributions</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Contributions from all partners</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  {partners.map((partner) => (
                    <TableHead key={partner.name} className="text-right">
                      {partner.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyContributions.map((contribution, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{contribution.month}</TableCell>
                    {partners.map((partner) => (
                      <TableCell key={partner.name} className="text-right">
                        {contribution[partner.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  {partners.map((partner) => (
                    <TableCell key={partner.name} className="text-right">
                      {monthlyContributions.reduce((sum, curr) => sum + curr[partner.name], 0)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month{' '}
              <TrendingUp className='h-4 w-4' />
            </div>
            <div className='leading-none text-muted-foreground'>
              Showing total contributions for the last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Partnership;
