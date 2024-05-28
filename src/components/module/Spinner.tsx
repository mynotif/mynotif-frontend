import { ClipLoader } from "react-spinners"

interface SpinnerProps {
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'white'
}

export const Spinner = ({ size = 'medium', variant = 'primary' }: SpinnerProps) => {
    let variantStyle: string = '', sizeStyle: string = ''

    switch (variant) {
        case 'primary': // default
            variantStyle = '#2BB8B9'
            break
        case 'white':
            variantStyle = '#ffffff'
            break
    }

    switch (size) {
        case 'small':
            sizeStyle = '20'
            break
        case 'medium': // default
            sizeStyle = '30'
            break
        case 'large':
            sizeStyle = '40'
            break
    }

    return (
        <ClipLoader color={variantStyle} size={sizeStyle} />
    )
}
