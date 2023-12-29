
import  Image  from 'next/image';
Image
function Logo() {
  return (
    <Image src="/logo.png" alt="logo" width={100} height={20}  style={{ width: 'auto', height: 'auto' }}  priority   />
 
  )
}

export default Logo;