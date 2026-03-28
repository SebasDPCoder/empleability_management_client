import Sidebar from './Sidebar'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-56 flex-1 px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout