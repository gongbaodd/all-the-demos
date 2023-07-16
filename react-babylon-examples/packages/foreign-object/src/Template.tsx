import { useCallback, useEffect, useRef, useState } from "react"
import { toSvg, toPng } from "../../html-to-image/src"
import { html2canvas } from "./html.js"

const members = [
  {
      avatar: "/images/xZ4wg2Xj.jpg",
      name: "John lorin",
      email: "john@example.com"
  }, {
      avatar: "/images/86.jpg",
      name: "Chris bondi",
      email: "chridbondi@example.com"
  }, {
      avatar: "/images/87.jpg",
      name: "yasmine",
      email: "yasmine@example.com"
  }, {
      avatar: "/images/88.jpg",
      name: "Joseph",
      email: "joseph@example.com"
  },
]

export default function (props: { setUrl: (url: string) => void }) {
  const dom = useRef<HTMLDivElement | null>(null)

  const render = useCallback(async () => {
    if (!dom.current) return
    toSvg(dom.current).then(url => {
      props.setUrl(url)
    })
  }, [])


  return (
  <>
  <div className="max-w-2xl px-4" ref={dom}>
      <div className="items-start justify-between sm:flex">
          <div>
              <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
              <p className="mt-2 text-gray-600 text-base sm:text-sm">Give your team members access to manage the system.</p>
          </div>
          <button onClick={render} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              New member
          </button>
      </div>
      <ul className="mt-12 divide-y">
          {
              members.map((item, idx) => (
                  <li key={idx} className="py-5 flex items-start justify-between hover:bg-orange-200">
                      <div className="flex gap-3">
                          <img title="image" src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                          <div>
                              <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                              <span className="block text-sm text-gray-600">{item.email}</span>
                          </div>
                      </div>
                      <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Manage</button>
                  </li>
              ))
          }
      </ul>
  </div>
  </>
)
}
