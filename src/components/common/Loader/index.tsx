import Lotties from '@/components/lotties'
import React from 'react'

type LoaderProps = {
  size?: string | number
}
export class Loader extends React.Component<LoaderProps> {
  static FullScreen = FullScreenLoader
  static InLine = InLineLoader

  render() {
    return <Lotties />
  }
}

function FullScreenLoader() {
  return (
    <div
      className="flex justify-center items-center fixed inset-0 z-[99999] bg-s-backdrop"
      style={{ margin: 0, padding: 0 }}
    >
      <Loader />
    </div>
  )
}

function InLineLoader() {
  return (
    <div className="flex items-center justify-center w-full min-h-[180px] bg-transparent">
      <Loader />
    </div>
  )
}
