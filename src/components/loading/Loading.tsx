import { Spinner } from '../module/Spinner'

interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'white';
}

export const Loading = ({ size = 'large', variant = 'primary' }: LoadingProps) => (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='border-4 border-t-4 border-colorprimary rounded-full w-12 h-12 animate-spin'>
            <Spinner size={size} variant={variant} />
        </div>
    </div>
)