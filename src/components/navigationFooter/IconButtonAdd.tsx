import { Button } from '../forms/inputGroups/Button'

interface IconButtonAddProps {
    onClick: () => void
    icon: any
    location: any
}

export const IconButtonAdd = ({ onClick, icon, location }: IconButtonAddProps) => {
    const isDisable = location.pathname === '/patients/create' ||
    location.pathname === '/prescriptions/create' ? true : false
    console.log({isDisable});
    
    return (
    <div onClick={onClick} className="flex flex-col items-start absolute -top-24 -right-8 z-10">
        <Button disabled={isDisable} icon={icon} iconTheme='accent' variant='icon' size='large' />
    </div>
)}