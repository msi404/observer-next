import Link from 'next/link'
import {SearchX} from 'lucide-react'
import { Container } from '@/app/_components/containers/container'
 import {Button} from '@/app/_components/ui/button'
export default function NotFound() {
  return (
    <Container className='mt-16 mx-auto flex justify-center items-center'>
      <div className='flex flex-col items-center space-y-3'>
      <SearchX className='size-64' color='gray'/>
      <h1 className='text-4xl font-semibold text-gray-500'>لا يوجد</h1>
      <p className='text-gray-500'>لا يمكن ايجاد الصفحة</p>
        <Link href="/">
          <Button variant='link'>
        الرجوع الى الصفحة الرئيسية
          </Button>
      </Link>
      </div>
    </Container>
  )
}