import * as React from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
interface AnimatedModalProps {
  visible?: boolean
  onClose?(event: React.MouseEvent<HTMLButtonElement>): void
  animation?: string
  children: React.ReactNode
  height?: number
  width?: number
}
const AnimatedModal = (props: AnimatedModalProps) => {
  return (
    <Rodal
      visible={props.visible}
      onClose={props.onClose}
      animation={props.animation}
      height={props.height}
      width={props.width}
    >
      {props.children}
    </Rodal>
  )
}

export default AnimatedModal
