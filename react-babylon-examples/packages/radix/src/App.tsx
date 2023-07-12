
import { useEffect, useRef, useState } from "react"
import "./style.css"
import * as PopOver from '@radix-ui/react-popover'
import {toPng} from "html-to-image"

export function App() {
  const [dom, setDom] = useState<HTMLDivElement | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!dom) return



    // const id = setInterval(() => {
      toPng(dom, { cacheBust: true }).then(url => {
        setImageUrl(url)
      })
    // }, 1000)

    return () => {
      // clearInterval(id)
    }

  }, [dom])

  return (
    <div ref={setDom}>
    <PopOver.Root>
      <PopOver.Trigger
        className={
          `bg-indigo-600 \
          hover:bg-indigo-700 \
          inline-block \
          rounded-md border border-transparent shadow-lg \
           px-8 py-3 \
           text-center font-medium text-white`}
      >
        Open
      </PopOver.Trigger>
      <PopOver.Portal>
        <PopOver.Content
          className={`PopoverContent \
            flex flex-col \
            h-full \
            shadow-lg rounded-sm border border-gray-200 \
          `}
          sideOffset={5}
        >
          Content
          <PopOver.Arrow className='PopoverArrow' />
        </PopOver.Content>
      </PopOver.Portal>
    </PopOver.Root>
    {imageUrl &&<img src={imageUrl}/>}
    </div>
  )
}
