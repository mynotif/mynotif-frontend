import { PlusIcon } from "lucide-react"

interface IconButtonAddProps {
    onClick: () => void
    location: any
  }
  
  export const IconButtonAdd = ({ onClick, location }: IconButtonAddProps) => {
    const isDisable = 
      location.pathname === '/patients/create' ||
      location.pathname === '/prescriptions/create'
  
    return (
      <div 
        onClick={onClick} 
        className="flex flex-col items-start absolute -top-16 -right-8 z-10"
      >
        <button 
          disabled={isDisable} 
          className={`
            rounded-full bg-colorprimary text-white 
            w-12 h-12 flex items-center justify-center 
            ${isDisable ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    )
  }