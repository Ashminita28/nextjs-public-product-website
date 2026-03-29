'use client';

import { useId, useRef, useState, useTransition, useEffect } from 'react';
import { toast } from 'sonner';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getErrorMessage, parseJsonSafely } from '@/lib/api';
import { composeAriaDescribedBy, scrollAndFocusElement } from '@/lib/aria';
import { apiRoutes } from '@/lib/routes';
import { newsletterSchema } from '@/lib/validations/newsletter-schema';

export function NewsletterForm() {
  const emailId = useId();
  const hintId = `${emailId}-hint`;
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Scroll to input if error occurs
  useEffect(() => {
    if (error) {
      scrollAndFocusElement(emailRef.current);
    }
  }, [error]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid email';
      setError(message);
      toast.error('Subscription failed', { description: message });
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(apiRoutes.subscribe, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        });

        const data = await parseJsonSafely<{
          message?: string;
          error?: string;
        }>(response);

        if (!response.ok) {
          const message = data?.error ?? 'Subscription failed';
          setError(message);
          toast.error('Subscription failed', { description: message });
          return;
        }

        setEmail('');
        toast.success(
          /already on the waitlist/i.test(data?.message ?? '')
            ? 'You are already on the waitlist'
            : 'Subscribed successfully!',
          { description: data?.message ?? 'You have joined the waitlist.' },
        );
      } catch (err) {
        const message = getErrorMessage(err, 'Subscription failed.');
        setError(message);
        toast.error('Subscription failed', { description: message });
      }
    });
  };

  return (
    <Card className="p-8">
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-[0.2em] text-cyan-400 uppercase">
          Newsletter / Waitlist
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Capture early adopters directly in Strapi
        </h3>
        <p className="max-w-xl text-sm leading-7 text-slate-300">
          This form validates your email, stores subscribers in Strapi, and
          shows success/error messages.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-6 flex flex-col gap-4 md:flex-row"
      >
        <Input
          id={emailId}
          ref={emailRef}
          type="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Work email"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={composeAriaDescribedBy(hintId)}
        />
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? 'Submitting...' : 'Join Waitlist'}
        </Button>
      </form>

      {error && (
        <p className="mt-2 text-sm text-rose-500" role="alert">
          {error}
        </p>
      )}

      <p id={hintId} className="mt-4 text-sm text-slate-300">
        Use a valid work email to join the waitlist.
      </p>
    </Card>
  );
}
