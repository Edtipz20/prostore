// components/shared/header/sign-out-button.tsx
"use client";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SignOutButton() {
  return (
    <DropdownMenuItem
      className="p-0 mb-1"
      onSelect={async (e) => {
        e.preventDefault();
        await signOutUser();
      }}
    >
      <Button
        type="button"
        variant="ghost"
        className="w-full py-4 px-2 h-4 justify-start cursor-pointer"
      >
        Sign Out
      </Button>
    </DropdownMenuItem>
  );
}
