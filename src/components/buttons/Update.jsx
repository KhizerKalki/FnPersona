import { Button } from '../ui/button';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function Update() {
  const { toast } = useToast();

  return (
    <div className='flex justify-end w-full mt-5'>
      <Button
        onClick={() => {
          toast({
            title: "Settings Updated",
            description: "Your settings have been successfully updated.",
            action: (
              <ToastAction altText="Close">Close</ToastAction>
            ),
          });
        }}
      >
        Update
      </Button>
    </div>
  );
}

export default Update;
