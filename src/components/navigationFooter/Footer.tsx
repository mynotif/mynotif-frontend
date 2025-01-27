import { FooterNav } from "./FooterNav"
import { useIsLoggedIn } from "../../utils/hooks"
import { useProfile } from "../../hook/profile.hook"
import { useLocation } from "react-router-dom"
import { FileTextIcon, HomeIcon, SettingsIcon, UsersIcon } from "lucide-react"

const Footer = (): JSX.Element => {
  const location = useLocation()
  useProfile()

  return (
    <>
      {useIsLoggedIn() === true && (
        <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-colorsecondary via-colorsecondary to-shade3 border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-10">
          <FooterNav
            location={location}
            icon={HomeIcon}
            url='/home'
          />
          <FooterNav
            location={location}
            icon={UsersIcon}
            url='/patients'
          />

          <FooterNav
            location={location}
            icon={FileTextIcon}
            url='/prescriptions'
          />
          <FooterNav
            location={location}
            icon={SettingsIcon}
            url='/setting'
          />
        </footer>
      )}
    </>
  )
}

export default Footer
