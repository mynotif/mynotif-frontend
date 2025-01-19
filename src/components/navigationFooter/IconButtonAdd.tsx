import { useState } from 'react'
import { Button } from '../forms/inputGroups/Button'
import ModalConfirmSend from '../modal/ModalConfirmSend'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../../hook/subscription'

interface IconButtonAddProps {
    onClick: () => void
    icon: any
    location: any
}

export const IconButtonAdd = ({ onClick, icon, location }: IconButtonAddProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate()
    const { subscription } = useSubscription();
    const isActive = subscription.active
    const isDisable = location.pathname === '/patients/create' ||
    location.pathname === '/prescriptions/create' ? true : false

    const handleClick = () => {
        if (isActive) {
          onClick();
        } else {
          setIsModalVisible(true);
        }
    };

    const closeModal = () => setIsModalVisible(false);

    const goToSubscription = () => {
        closeModal()
        navigate('/subscription')
    }

    return (
    <>
    <div onClick={handleClick} className="flex flex-col items-start absolute -top-16 -right-8 z-10">
        <Button disabled={isDisable} icon={icon} iconTheme='accent' variant='icon' size='large' />
    </div>

    {isModalVisible && (
        <ModalConfirmSend
            confirmText='Vous devez souscrire à un abonnement pour accéder à cette fonctionnalité'
            handleClose={closeModal}
            noText='Annuler'
            show={isModalVisible}
            onConfirm={goToSubscription}
            yesText='Souscrire'
            title='Abonnement'
        />
    )}
    </>
)}
