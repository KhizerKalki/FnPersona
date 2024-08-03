import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TrendingUp, Settings, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ContributionTracking from "@/components/graph/client/ContributionTracking";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { SharedFinancial } from "@/components/graph/client/SharedFinancial";
import PartnershipSettings from "@/components/partnerships/PartnershipSettings";

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
      Send Messages
    </Button>
  );
};

const Partnership = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [partners, setPartners] = useState([
    {
      name: "Alice",
      email: "alice@example.com",
      contribution: 500,
      color: "#4caf50",
      privacy: { showTransactions: true, hideSensitiveData: false },
      accessLevel: "view-only",
    },
    {
      name: "Bob",
      email: "bob@example.com",
      contribution: 700,
      color: "#f44336",
      privacy: { showTransactions: true, hideSensitiveData: false },
      accessLevel: "view-only",
    },
    {
      name: "Charlie",
      email: "charlie@example.com",
      contribution: 300,
      color: "#2196f3",
      privacy: { showTransactions: true, hideSensitiveData: false },
      accessLevel: "view-only",
    },
  ]);

  const [monthlyContributions, setMonthlyContributions] = useState([]);

  const colors = ["#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0"];

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
      contribution: Math.floor(Math.random() * 1000),
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
  const handleAccessLevelChange = (partnerName, value) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.name === partnerName
          ? { ...partner, accessLevel: value }
          : partner
      )
    );
  };
  const TextareaWithButtonSingle = ({ partner, onMessageSend }) => {
    const [message, setMessage] = useState("");
    const { toast } = useToast();

    const handleSend = () => {
      const isMessageEmpty = !message;
      if (isMessageEmpty) {
        toast({
          description: "Message cannot be empty.",
          className: "bg-white dark:bg-black",
        });
        return;
      }
      onMessageSend(message);
      setMessage("");
      toast({
        description: "Your message has been sent.",
        className: "bg-white dark:bg-black",
      });
      setIsDrawerOpen(false);
    };

    return (
      <div>
        <h3 className="font-bold dark:text-white mt-3 mb-3 ml-3">
          Message {partner.name}
        </h3>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Send a message to ${partner.name}`}
          className="mt-3 mb-3 dark:text-white w-[95%] mx-auto"
        />
        <Button onClick={handleSend} className="mt-3 mb-3 ml-3">
          Send
        </Button>
      </div>
    );
  };

  const TextareaWithButton = ({ partners, onMessageSend }) => {
    const [message, setMessage] = useState("");
    const [selectedPartner, setSelectedPartner] = useState("");
    const { toast } = useToast();

    const handlePartnerSelect = (partner) => {
      setSelectedPartner(partner);
      setMessage((prevMessage) => prevMessage + `@${partner} `);
    };

    const handleSendMessage = () => {
      const trimmedMessage = message.trim();
      const isMessageEmpty =
        !trimmedMessage || trimmedMessage === `@${selectedPartner}`;

      if (
        !selectedPartner &&
        !partners.some((partner) => trimmedMessage.includes(`@${partner.name}`))
      ) {
        toast({
          description: "Please select a partner before sending the message.",
          className: "bg-white dark:bg-black",
        });
        return;
      }

      if (isMessageEmpty) {
        toast({
          description: "Message cannot be empty.",
          className: "bg-white dark:bg-black",
        });
        return;
      }

      onMessageSend(message);
      setMessage("");
      toast({
        description: "Your message has been sent.",
        className: "bg-white dark:bg-black",
      });
      setIsDrawerOpen(false);
    };

    return (
      <>
        <h1 className="dark:text-white ml-4 items-center justify-between mb-4 font-semibold">
          Message Partner
        </h1>
        <div className="w-[100%] items-center justify-between p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h1 className="mb-4 dark:text-white pl-2 hover:underline hover:cursor-pointer">
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
          <div className="flex flex-col w-full">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here."
              className="dark:text-white mx-auto w-[100%]  mb-6"
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleSendMessage}
                className="dark:text-white w-[30%]"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const DrawerDemo = ({ partners }) => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="dark:text-white">
          Message
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[95%] sm:w-[500px] mx-auto">
        <TextareaWithButton
          partners={partners}
          onMessageSend={(message) => {
            console.log("Message sent:", message);
          }}
        />
      </DrawerContent>
    </Drawer>
  );

  const DrawerDemoSingle = ({ partner }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="dark:text-white">
            Message
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-[95%] sm:w-[500px] mx-auto">
          <TextareaWithButtonSingle
            partner={partner}
            onMessageSend={(message) => {
              console.log("Message sent:", message);
            }}
          />
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold dark:text-white">Partners</h2>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="dark:text-white">
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Partner</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" type="text" required />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Partner</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <ul className="space-y-4 mt-4">
            {partners.map((partner) => (
              <Card key={partner.email}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{partner.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Settings className="w-5 h-5 dark:text-white hover:cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                          value={partner.accessLevel}
                          onValueChange={(value) =>
                            handleAccessLevelChange(partner.name, value)
                          }
                        >
                          <DropdownMenuRadioItem value="view-only">
                            View Only
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="edit">
                            Edit
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="admin">
                            Admin
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                  <CardDescription>{partner.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold mb-4">
                    Contribution: ${partner.contribution}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label className="dark:text-white">
                        Show Transactions
                      </Label>
                      <Checkbox
                        checked={partner.privacy.showTransactions}
                        onCheckedChange={(value) =>
                          handlePrivacyChange(
                            partner.name,
                            "showTransactions",
                            value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label className="dark:text-white">
                        Hide Sensitive Data
                      </Label>
                      <Checkbox
                        checked={partner.privacy.hideSensitiveData}
                        onCheckedChange={(value) =>
                          handlePrivacyChange(
                            partner.name,
                            "hideSensitiveData",
                            value
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <DrawerDemoSingle partner={partner} />
                  <Button variant="outline" className="dark:text-white">
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold dark:text-white mb-4">
            Financial Information
          </h2>
          <SharedFinancial
            partners={partners.map((partner) => ({
              name: partner.name,
              contribution: partner.contribution,
              color: partner.color,
            }))}
          />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold dark:text-white mb-4">
            Partnership Settings
          </h2>
          <PartnershipSettings partners={partners} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white mt-6">
          Monthly Contributions
        </h2>
        <ContributionTracking data={monthlyContributions} />
      </div>
      <div className="flex items-center justify-center mt-6">
        <DrawerDemo partners={partners} />
      </div>
    </div>
  );
};

function generateMonthlyContributions(partners) {
  return partners.map((partner) => ({
    id: partner.email,
    data: Array.from({ length: 12 }, (_, i) => ({
      x: `Month ${i + 1}`,
      y: Math.floor(Math.random() * 1000),
    })),
  }));
}

export default Partnership;
