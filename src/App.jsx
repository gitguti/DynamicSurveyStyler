import { useState } from 'react';
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [color, setColor] = useState('#000000');
  const [title, setTitle] = useState('Welcome');
  const [subtext, setSubtext] = useState('This is a long sentence to introduce the survey.');
  const [buttonText, setButtonText] = useState('Get started');
  const [contrastColor, setContrastColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');


  function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s *= 100;
    l *= 100;
    
    // return `hsl(${h}, ${s}%, ${l}%)`;
    //console.log(`hsl(${h}, ${s}%, ${l}%)`)
    return {h, s, l};

  }

  const getContrastColor = (H) => {
    const {h, s, l} = hexToHSL(H); // Obtener el color en formato HSL
    let contrastLuminance;
  
    if (l >= 50) {
      contrastLuminance = 10; // Tono más claro para contraste
      setTextColor('#FFFFFF'); // Establecer el color del texto a blanco
    } else {
      contrastLuminance = 90; // Tono más oscuro para contraste
      setTextColor('#000000'); // Establecer el color del texto a negro

    }
    const contrastColor = `hsl(${h}, ${s}%, ${contrastLuminance}%)`;
    setContrastColor(contrastColor); // Actualizar el color del botón
    setColor(H); // Actualizar el color de fondo del panel
  };

  return (
    <>
    <div style={{display: 'flex', height: '100vh', width: '100vw'}}>
      <div style={{ width: '20%', height: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <label htmlFor="primary-color">Select primary color</label>
    <input type="color" name="primary-color" onChange={(e) => getContrastColor(e.target.value)}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <label htmlFor="title">Title</label>
    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <label htmlFor="subtext">Subtext</label>
    <input type="text" name="subtext" onChange={(e) => setSubtext(e.target.value)} />
    </div>
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <label htmlFor="button-cta">Button CTA</label>
    <input type="text" name="button-cta" onChange={(e) => setButtonText(e.target.value)}/>
    </div>

    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <p>Primary Color</p>
    <div style={{background: color, width:'100%', height:'120px', margin: '0 auto'}}/>
    <p>{color}</p>
    </div>

    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding:'1rem 2rem'}}>
      <p>Contrast Color</p>
    <div style={{background: contrastColor, width:'100%', height:'120px', margin: '0 auto'}}/>
    <p>{contrastColor}</p>
    </div>

    </div>

      <div style={{display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: color, color: contrastColor}}>
        <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        </div>
      <h1>{title}</h1>
      <p>{subtext}</p>
      <button style={{display: 'block', backgroundColor: contrastColor, color: textColor}}>
      {buttonText}</button>
        </div>
        </div>
    </>
  )
}

export default App
