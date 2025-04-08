'use client'

import { ReactNode, useEffect } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {


  return <div className="flex h-dvh dashboard">{children}</div>
}

export default DashboardLayout
