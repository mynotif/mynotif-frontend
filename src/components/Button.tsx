import { Button as CustomButton } from 'react-bootstrap'
import useTranslationHook from '../hook/TranslationHook'

interface ButtonProps {
  variant: string
  href: string
  name: string
  className?: string
  style?: React.CSSProperties
}

const Button = ({ variant, href, name, className, style }: ButtonProps): JSX.Element => {
  const { t } = useTranslationHook()

  return (
    <CustomButton variant={variant} href={href} className={className} style={style}>
      {t(name)}
    </CustomButton>
  )
}

export default Button
