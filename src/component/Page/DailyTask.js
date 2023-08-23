import { Greeting } from "../../utils/greeting"
import { useDispatch } from 'react-redux'
import { reverseNavbar } from '../../redux/hideAndShowSlice'

export function DailyTask() {
  
    const dispatch = useDispatch()
    const taglines = [
      "Fitur baru akan tersedia",
      "Tunggu sebentar",
      "dikerjakan 24/08/2023",
    ]
  
    return (
      <div className="flex w-full sm:flex-row flex-col">
        <div className="welcome flex flex-col overflow-auto flex-3">
          <Greeting />
          <div className="welcome_page d-flex fd-column ai-center jc-flex-start">
            <p className="welcome_name as-flex-start">Daily</p>
            <span className="welcome_tagline as-flex-start">
              {taglines[Math.floor(Math.random() * taglines.length)]}
            </span>
            <span
              className="tapToOpenNavbar as-flex-start d-block bg-burlywood text-primary shadow-lg"
              onClick={() => dispatch(reverseNavbar())}
            >
              Ketuk untuk membuka navbar
            </span>
          </div>
        </div>
      </div>
    )
  }