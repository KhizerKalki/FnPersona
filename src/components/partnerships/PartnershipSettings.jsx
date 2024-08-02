import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

function PartnershipSettings({ partner, setPartners }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handlePrivacyChange = (key, value) => {
    setPartners((prevPartners) =>
      prevPartners.map((p) =>
        p.name === partner.name
          ? { ...p, privacy: { ...p.privacy, [key]: value } }
          : p
      )
    );
  };

  const handleSettingsClose = () => setIsSettingsOpen(false);

  const handleAccessLevelChange = (value) => {
    setPartners((prevPartners) =>
      prevPartners.map((p) =>
        p.name === partner.name ? { ...p, accessLevel: value } : p
      )
    );
  };

  return (
    <DropdownMenu open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="dark:text-white">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:max-w-[425px] p-4 bg-white rounded-lg shadow-lg">
        <div className="py-2">
          <div className="mb-4">
            <Label className="dark:text-white">
              Advanced Privacy Controls:
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Restrict access to specific financial data or features.
            </p>
            <div className="mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-bold dark:text-white">{partner.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="dark:text-white">
                      Access Level
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuRadioGroup
                      value={partner.accessLevel}
                      onValueChange={handleAccessLevelChange}
                    >
                      <DropdownMenuRadioItem value="view-only">
                        View-Only
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="edit-permissions">
                        Edit Permissions
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="full-access">
                        Full Access
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  checked={partner.privacy.showTransactions}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showTransactions", checked)
                  }
                />
                <Label className="text-gray-600 dark:text-gray-400">
                  Show transactions
                </Label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  checked={partner.privacy.hideSensitiveData}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("hideSensitiveData", checked)
                  }
                />
                <Label className="text-gray-600 dark:text-gray-400">
                  Hide sensitive data
                </Label>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleSettingsClose}
          className="dark:text-white"
        >
          Close
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PartnershipSettings;
