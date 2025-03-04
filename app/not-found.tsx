import Link from 'next/link'
 import {Container} from '@/app/_components/container'
export default function NotFound() {
  return (
    <Container>
      <h2>لا يوجد</h2>
      <p>لا يمكن ايجاد الصفحة</p>
      <Link href="/">الرجوع الى الصفحة الرئيسية</Link>
    </Container>
  )
}