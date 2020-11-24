import React, { useState, useContext, createContext } from "react";

const TitleContext = createContext();
const ColorContext = createContext();

function DemoInnerBoxContent() {
  const [title, setTitle] = useContext(TitleContext)
  const color = useContext(ColorContext)
  console.log('inner color', color.primary)
  console.log('inner render')
  return (
    <div>
      <button style={{color: color.primary}} onClick={() => {
        setTitle(Math.random())
      }}>Update title!</button>
      {title}
    </div>
  )
}

function DemoInnerBox() {
  return (
    <ColorContext.Provider value={{primary: 'orange'}}>
      <DemoInnerBoxContent/>
    </ColorContext.Provider>
  )
}
function DemoInner() {
  return <DemoInnerBox/>
}

export default function PropDrilling() {
  const [title, setTitle] = useState('I am a title!');
  const [color, setColor] = useState({primary: 'green'});
  return (
    <ColorContext.Provider value={color}>
      <button onClick={() => {
        setColor({
          primary: 'blue'
        })
        console.log(color)
      }}>change color</button>
      <TitleContext.Provider value={[title, setTitle]}>
        <div>
          title: {title}
          <DemoInner/>
        </div>
      </TitleContext.Provider>
    </ColorContext.Provider>
  )
}