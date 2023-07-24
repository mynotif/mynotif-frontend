interface SidebarTitleNavProps {
  title: string
}

const SidebarTitleNav = ({ title }: SidebarTitleNavProps): JSX.Element => (
  <div className='d-flex align-items-center gap-2'>
    <div className='ps-1'>
      <h6 className='fw-bold text-white mb-0'>{title}</h6>
    </div>
  </div>
)

export default SidebarTitleNav
