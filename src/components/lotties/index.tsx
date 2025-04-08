import { lottieSet } from './lottieSet'
import Lottie from 'lottie-react'

export default function Lotties({ name = 'animation-random', className }: { name?: string; className?: string }) {
  return (
    <Lottie
      className={className}
      animationData={lottieSet[name]}
      loop={true}
    />
  )
}
