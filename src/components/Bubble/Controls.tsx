import {
  FiShuffle,
  FiRefreshCcw,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
} from 'react-icons/fi'
import Tooltip from '../Extras/ToolTip'

const iconClass =
  'bg-slate-500 hover:bg-slate-700 text-black text-lg font-extrabold p-2 rounded-xl'

interface Controls {
  status: { playing: boolean; cancelled: boolean }
  shuffle: () => Promise<void>
  sort: () => void
  cancel: () => void
  reset: () => void
  stepForward: () => void
  stepBack: () => void
}

export default function Controls({
  status,
  sort,
  shuffle,
  cancel,
  reset,
  stepForward,
  stepBack,
}: Controls) {
  return (
    <>
      <div className="flex flex-row justify-between items-center gap-8 px-20">
        <Tooltip message={'Shuffle'} className="right-[-10px]">
          <button className={iconClass} onClick={shuffle}>
            <FiShuffle size={24} strokeWidth={2.5} />
          </button>
        </Tooltip>
        <div className="flex flex-row justify-center items-center gap-4">
          <Tooltip message={'Step Back'} className="left-[-18px]">
            <button className={iconClass} onClick={stepBack}>
              <FiSkipBack size={24} strokeWidth={2.5} />
            </button>
          </Tooltip>
          <Tooltip
            message={status.playing ? 'Pause' : 'Play'}
            className={status.playing ? 'left-[-8px]' : 'left-[-4px]'}
          >
            <button
              className={iconClass}
              onClick={status.playing ? cancel : sort}
            >
              {status.playing ? (
                <FiPause size={24} strokeWidth={2.5} />
              ) : (
                <FiPlay size={24} strokeWidth={2.5} />
              )}
            </button>
          </Tooltip>

          <Tooltip message={'Step Forward'} className="right-[-26px]">
            <button className={iconClass} onClick={stepForward}>
              <FiSkipForward size={24} strokeWidth={2.5} />
            </button>
          </Tooltip>
        </div>
        <Tooltip message={'Reset'} className="left-[-7.5px]">
          <button className={iconClass} onClick={reset}>
            <FiRefreshCcw size={24} strokeWidth={2.5} />
          </button>
        </Tooltip>
      </div>
    </>
  )
}
