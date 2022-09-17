import { program } from 'commander'
import { start } from '@/lib'
import cfonts from 'cfonts'
import { randomColors, randomFonts } from '@/lib/utils'

cfonts.say('Chrome Decrypter', {
  font: randomFonts,
  align: 'left',
  colors: [randomColors],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  maxLength: '0',
})

program.version('0.0.1').description('decrypt local chrome passwords')

start()
