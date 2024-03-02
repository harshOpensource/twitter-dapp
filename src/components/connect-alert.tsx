import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  connectWallet: () => void;
};

function ConnectWalletAlert({ isOpen, setIsOpen, connectWallet }: Props) {
  return (
    <AlertDialog open={!isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Metamask Alert
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            You are not connected to the goerli Test Network.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4">
          <Button
            className="rounded-md"
            variant={"outline"}
            onClick={() => setIsOpen(true)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-md text-gray-900 font-semibold"
            variant={"default"}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConnectWalletAlert;
