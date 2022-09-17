const colors = [
  'system',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
]
const fonts = ['block']

export const randomColors = colors[Math.floor(Math.random() * colors.length)]
export const randomFonts = fonts[Math.floor(Math.random() * fonts.length)]
