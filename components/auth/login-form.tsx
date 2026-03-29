'use client';

import { useId, useRef, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { composeAriaDescribedBy, scrollAndFocusElement } from '@/lib/aria';
import { loginSchema, LoginFormValues } from '@/lib/validations/auth-schema';
import { pageRoutes } from '@/lib/routes';
import { getErrorMessage } from '@/lib/api';

export function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const fieldRefs = useRef<
    Partial<Record<keyof LoginFormValues, HTMLInputElement | null>>
  >({});

  const emailId = useId();
  const passwordId = useId();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const emailField = form.register('email');
  const passwordField = form.register('password');

  // Scroll to first error if validation fails
  const errors = form.formState.errors;
  const submitCount = form.formState.submitCount;
  useEffect(() => {
    if (submitCount > 0) {
      const firstError = Object.keys(errors)[0] as
        | keyof LoginFormValues
        | undefined;
      if (firstError) scrollAndFocusElement(fieldRefs.current[firstError]);
    }
  }, [errors, submitCount]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          ...values,
          redirect: false,
        });

        if (result?.error) {
          toast.error('Sign-in failed', {
            description: 'Invalid credentials. Check your account.',
          });
          return;
        }
        toast.success('Signed in successfully!');
        router.push(pageRoutes.dashboard);
        router.refresh();
      } catch (err) {
        toast.error('Unable to sign in', { description: getErrorMessage(err) });
      }
    });
  });

  return (
    <Card className="mx-auto max-w-sm p-6 rounded-2xl shadow-md">
      <h2 className="mb-6 text-center text-2xl font-semibold">Welcome back</h2>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <Input
            id={emailId}
            placeholder="Email"
            {...emailField}
            ref={(el) => {
              emailField.ref(el);
              fieldRefs.current.email = el;
            }}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={composeAriaDescribedBy(
              errors.email && `${emailId}-error`,
            )}
          />
          <p
            id={`${emailId}-error`}
            className="mt-1 text-xs text-rose-500"
            role={errors.email ? 'alert' : undefined}
          >
            {errors.email?.message}
          </p>
        </div>

        <div>
          <Input
            id={passwordId}
            type="password"
            placeholder="Password"
            {...passwordField}
            ref={(el) => {
              passwordField.ref(el);
              fieldRefs.current.password = el;
            }}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={composeAriaDescribedBy(
              errors.password && `${passwordId}-error`,
            )}
          />
          <p
            id={`${passwordId}-error`}
            className="mt-1 text-xs text-rose-500"
            role={errors.password ? 'alert' : undefined}
          >
            {errors.password?.message}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <Button
        variant="secondary"
        className="mt-4 w-full"
        onClick={() =>
          signIn('google', {
            callbackUrl: pageRoutes.dashboard,
            prompt: 'select_account',
          })
        }
      >
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        have an account?{' '}
        <Link
          href={pageRoutes.register}
          className="text-primary hover:underline"
        >
          Signup
        </Link>
      </p>
    </Card>
  );
}
