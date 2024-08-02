import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TrendingUp, Settings, MessageCircle } from 'lucide-react';
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
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import ContributionTracking from '@/components/graph/client/ContributionTracking';
import { useState, useEffect } from 'react';
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

const ToastSimple = ({ message }) => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: message,
        });
      }}
      className="dark:text-white"
    >
      Send Message
    </Button>
  );
};

const Partnership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [partners, setPartners] = useState([
    {
      name: 'Alice',
      email: 'alice@example.com',
      contribution: 500,
      color: '#4caf50',
      privacy: { showTransactions: true, hideSensitiveData: false },
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      contribution: 700,
      color: '#f44336',
      privacy: { showTransactions: true, hideSensitiveData: false },
    },
    {
      name: 'Charlie',
      email: 'charlie@example.com',
      contribution: 300,
      color: '#2196f3',
      privacy: { showTransactions: true, hideSensitiveData: false },
    },
  ]);
  const [accessLevel, setAccessLevel] = useState('view-only');
  const [monthlyContributions, setMonthlyContributions] = useState([]);

  const colors = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0'];

  useEffect(() => {
    setMonthlyContributions(generateMonthlyContributions(partners));
  }, [partners]);

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
      privacy: { showTransactions: true, hideSensitiveData: false },
    };
    setPartners([...partners, newPartner]);
    setIsOpen(false);
  };

  const handlePrivacyChange = (partnerName, key, value) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.name === partnerName
          ? { ...partner, privacy: { ...partner.privacy, [key]: value } }
          : partner
      )
    );
  };

  const TextareaWithButton = ({ partners, onMessageSend }) => {
    const [message, setMessage] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('');
    const { toast } = useToast();

    const handlePartnerSelect = (partner) => {
      setSelectedPartner(partner);
      setMessage((prevMessage) => prevMessage + `@${partner} `);
    };

    const handleSendMessage = () => {
      const trimmedMessage = message.trim();
      const isMessageEmpty = !trimmedMessage || trimmedMessage === `@${selectedPartner}`;

      if (!selectedPartner && !partners.some(partner => trimmedMessage.includes(`@${partner.name}`))) {
        toast({
          description: "Please select a partner before sending the message.",
        });
        return;
      }

      if (isMessageEmpty) {
        toast({
          description: "Message cannot be empty.",
        });
        return;
      }

      onMessageSend(message);
      setMessage('');
      toast({
        description: "Your message has been sent.",
      });
      setIsDrawerOpen(false); // Close the drawer after sending the message
    };

    return (
      <>
        <h1 className='dark:text-white ml-4 items-center justify-between mb-4'>
          Message Partner
        </h1>
        <div className='w-[50%] items-center justify-between p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h1 className='mb-4 dark:text-white pl-2 hover:underline hover:cursor-pointer"'>
                Select Partner
              </h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {partners.map((partner) => (
                <DropdownMenuRadioItem
                  key={partner.name}
                  onClick={() => handlePartnerSelect(partner.name)}
                >
                  {partner.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message here.'
            className='dark:text-white w-[430px] mb-6'
          />
          <Button
            variant="outline"
            onClick={handleSendMessage}
            className="dark:text-white ml-72"
          >
            Send Message
          </Button>
        </div>
      </>
    );
  };

  const DrawerDemo = ({ partners }) => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='dark:text-white'>
          Message
        </Button>
      </DrawerTrigger>
      <DrawerContent className='w-[500px] ml-14'>
        <TextareaWithButton
          partners={partners}
          onMessageSend={(message) => {
            console.log('Message sent:', message);
          }}
        />
      </DrawerContent>
    </Drawer>
  );

  const generateMonthlyContributions = (partners) => {
    const getRandomContribution = () => Math.floor(Math.random() * 1000);
    return [
      {
        month: 'Jan',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
      {
        month: 'Feb',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
      {
        month: 'Mar',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
      {
        month: 'Apr',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
      {
        month: 'May',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
      {
        month: 'Jun',
        ...Object.fromEntries(
          partners.map((p) => [p.name, getRandomContribution()])
        ),
      },
    ];
  };

  return (
    <div className='container'>
      <div className='gap-4'>
        <div className='header-section p-4 mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font- dark:text-white'>
              Manage Partnership
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Manage your partnerships, invite new partners, and control privacy
              settings all in one place.
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
            <DrawerDemo partners={partners} />
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='dark:text-white'>
                  <Settings className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='dark:text-white'>
                    Settings
                  </DialogTitle>
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
                    <Label className='dark:text-white'>
                      Advanced Privacy Controls:
                    </Label>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Restrict access to specific financial data or features.
                    </p>
                    {partners.map((partner) => (
                      <div key={partner.name} className='mt-2'>
                        <h3 className='font-bold dark:text-white'>
                          {partner.name}
                        </h3>
                        <div className='flex items-center gap-2 mt-1'>
                          <Checkbox
                            checked={partner.privacy.showTransactions}
                            onCheckedChange={(checked) =>
                              handlePrivacyChange(
                                partner.name,
                                'showTransactions',
                                checked
                              )
                            }
                          />
                          <Label className='text-gray-600 dark:text-gray-400'>
                            Show transactions
                          </Label>
                        </div>
                        <div className='flex items-center gap-2 mt-1'>
                          <Checkbox
                            checked={partner.privacy.hideSensitiveData}
                            onCheckedChange={(checked) =>
                              handlePrivacyChange(
                                partner.name,
                                'hideSensitiveData',
                                checked
                              )
                            }
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
        <ContributionTracking
          partners={partners}
          monthlyContributions={monthlyContributions}
        />
      </div>

      {/* All Partners Contributions Table */}
      <div className='mt-4 grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-md'>Partner Contributions</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Contributions from all partners</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  {partners.map((partner) => (
                    <TableHead key={partner.name} className='text-right'>
                      {partner.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyContributions.map((contribution, idx) => (
                  <TableRow key={idx}>
                    <TableCell className='font-medium'>
                      {contribution.month}
                    </TableCell>
                    {partners.map((partner) => (
                      <TableCell key={partner.name} className='text-right'>
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
                    <TableCell key={partner.name} className='text-right'>
                      {monthlyContributions.reduce(
                        (sum, curr) => sum + curr[partner.name],
                        0
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
         
        </Card>

        {/* Partner Settings Table */}
        <Card>
          <CardHeader>
            <CardTitle className='text-md'>Partner Settings</CardTitle>
            <CardDescription className='text-[12px]'>
              Adjust partner access and privacy settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Settings for each partner</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-left w-full'>Name</TableHead>
                  <TableHead className='text-right'>Settings</TableHead>
                  <TableHead className='text-right'>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.name}>
                    <TableCell className='text-left font-medium'>
                      {partner.name}
                    </TableCell>

                    <TableCell className='text-right'>
                      <Button variant='outline' className='dark:text-white'>
                        <Settings className='h-4 w-4' />
                      </Button>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='outline' className='dark:text-white'>
                        <MessageCircle className='h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partnership;
