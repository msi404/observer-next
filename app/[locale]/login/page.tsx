'use client';
import { type NextPage } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectToken } from '@/app/_lib/features/authSlice';

import { Container } from '@/app/_components/container';
import { LoginForm } from '@/app/_components/login-form';
import Logo from '@/app/_assets/logo.png';
import CompanyLogo from '@/app/_assets/company.png';

const SignInPage: NextPage = () => {
  const token = useSelector(selectToken);

  if (token) return redirect('/');
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Container className="flex flex-col flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
          <div className="flex justify-center gap-2 md:justify-start absolute bottom-4 ">
            <div className="flex items-center justify-center rounded-md text-primary-foreground">
              <Image
                src={CompanyLogo.src}
                width={100}
                height={100}
                alt="Logo"
              />
            </div>
            <span className="text-slate-400">Powered By</span>
          </div>
        </Container>
      </div>
      <div className="relative hidden bg-muted lg:block">
		<div className='absolute inset-0 left-1/3 right-1/3 top-1/3 translate-y-1/3 h-1/3 w-1/3 object-cover 
					dark:brightness-[0.2] dark:grayscale'>
				  <div className="flex flex-col justify-center items-center gap-2 md:justify-start">
            <div className="flex items-center justify-center rounded-md text-primary-foreground">
              <Image src={Logo.src} width={120} height={120} alt="Logo" />
            </div>
            <span className="text-slate-400">نظام المراقب</span>
          </div>
			</div>
      </div>
    </div>
  );
};
export default SignInPage;
