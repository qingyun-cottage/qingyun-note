import { useEffect, useState } from 'react'
import './App.css'
import { fontColorContrast, getJSONByFetch, sortColorsByHSV } from './utils/tools'

type Color = {
  name: string
  pinyin: string
  hex: string
  RGB: Array<number>
  CMYK: Array<number>
  rgb: string
  cmyk: string
  contrast: string
}

function App() {
  // 颜色列表
  const [colorList, setColorList] = useState<Array<Color>>([])

  useEffect(() => {
    getJSONByFetch('data/colors.json').then((data) => {
      handleColors(data)
    })


    // handleColors(colors)
  }, []) // 空数组作为第二个参数表示这个effect仅在组件挂载和卸载时运行

  function handleColors(colorsArray: any) {
    const sortColors = sortColorsByHSV(colorsArray).map((color: Color) => {
      const { CMYK, RGB } = color
      // return fontColorContrast(RGB)
      return {
        ...color,
        cmyk: `CMYK (${CMYK.join(', ')})`,
        rgb: `RGB (${RGB.join(', ')})`,
        // @ts-ignore
        contrast: fontColorContrast(RGB),
      }
    })
    setColorList(sortColors)
  }

  return (
    <>
      <h1 className="title">中国色卡片示例</h1>
      <div className="page">
        <div className="content">
          <div id="card_list">
            {colorList.map((color, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor: color.hex,
                  color: color.contrast,
                }}
              >
                <span className="name">{color.name}</span>
                <span className="pinyin">{color.pinyin}</span>
                <span className="rgb">{color.rgb}</span>
                <span className="hex">{color.hex}</span>
                <span className="cmyk">{color.cmyk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
