'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from '@/lib/icons';

export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/' })}
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-3.5 w-3.5" />
      Logout
    </Button>
  );
}
