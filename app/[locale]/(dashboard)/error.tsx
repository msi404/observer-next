'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { Container } from '@/app/_components/container'
import { Retry } from '@/app/_components/retry'
 import {Bug} from 'lucide-react'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Container className='flex flex-col gap-10 justify-center items-center'>
		  <div className='text-red-500 flex gap-8'>
			  <div className='flex flex-col justify-center items-center gap-3'>
			  <h2 className='text-4xl font-bold'>حدث خطأ ما!</h2>
			  <p>{error.message}</p>
			  </div>
		  <Bug size={34} className=' -rotate-45'/> 
		</div>
      <Retry refetch={(reset)}/>
    </Container>
  )
}