import { useContext } from 'react'
import { ErrorContext } from '../context/error'
import Error from './Error'

const Errors = (): JSX.Element => {
  const { errors, setErrors } = useContext(ErrorContext)
  const removeIndex = (index: number): void =>
    setErrors(errors.filter((e, i) => i !== index))

  return (
    <>
      {errors.map(({ title, body, variant, delay }, index) => (
        <Error
          key={body}
          title={title}
          body={body}
          variant={variant}
          delay={delay}
          onClose={() => removeIndex(index)}
        />
      ))}
    </>
  )
}

export default Errors
