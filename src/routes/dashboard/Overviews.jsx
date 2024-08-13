import BudgetCards from "@/components/budget/BudgetCards";
import NotificationTwo from "@/components/budget/NotificationTwo";
import { BudgetBarGraph } from "@/components/graph/client/BudgetBarGraph";
import BudgetDistri from "@/components/graph/client/BudgetDistri";
import BudgetExp from "@/components/graph/client/BudgetExp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Overviews = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-medium mt-5 dark:text-white">
            Budget Overview
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get a clear snapshot of your spending and savings.
          </p>
        </div>
        <div className="mt-10">
          <Button onClick={() => navigate("/dashboard/budget/addbudget")}>
            Add Budget
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1 sm:col-span-2 lg:col-span-4"></div>
        <div className="col-span-1">
          <BudgetCards />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <BudgetBarGraph />
        </div>
        <div className="col-span-1">
          <BudgetDistri />
        </div>
        <div className="col-span-1">
          <BudgetExp />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <NotificationTwo />
        </div>
      </div>
    </div>
  );
};

export default Overviews;
