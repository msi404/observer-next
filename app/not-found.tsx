import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>لا يوجد</h2>
      <p>لا يمكن ايجاد الصفحة</p>
      <Link href="/">الرجوع الى الصفحة الرئيسية</Link>
    </div>
  )
}