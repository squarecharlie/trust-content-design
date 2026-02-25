import './SlideCounter.css'

interface SlideCounterProps {
  current: number
  total: number
}

const SlideCounter = ({ current, total }: SlideCounterProps) => {
  return (
    <div className="slide-counter">
      {current} / {total}
    </div>
  )
}

export default SlideCounter
