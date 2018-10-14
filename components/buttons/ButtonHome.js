import Link from 'next/link'
import Button from 'react-bulma-components/lib/components/button'
import Icon from 'react-bulma-components/lib/components/icon'

const ButtonHome = props =>
  <Link prefetch href='/'>
    <Button color='primary' {...props}>
      <Icon icon='angle-down'>&lt;</Icon>
      <span>Go Home</span>
    </Button>
  </Link>

export default ButtonHome
