import React from 'react'
import Svg, { Circle, Rect, Path } from 'react-native-svg'

const systemsArr = [
  {
    name: 'Torah',
    symbols: [
      {
        symbol: require('../assets/1-merekha.png'),
        sound: require('../assets/1-merekha.wav')
      },
      {
        symbol: require('../assets/2-tipecha.png'),
        sound: require('../assets/2-tipecha.wav')
      },
      {
        symbol: require('../assets/3-munach.png'),
        sound: require('../assets/3-munach.wav')
      },
      {
        symbol: require('../assets/4-etnakhta.png'),
        sound: require('../assets/4-etnakhta.wav')
      },
      {
        symbol: require('../assets/5-siluk.png'),
        sound: require('../assets/5-siluk.wav')
      },
      {
        symbol: require('../assets/6-kadma.png'),
        sound: require('../assets/6-kadma.wav')
      },
      {
        symbol: require('../assets/7-mapakh.png'),
        sound: require('../assets/7-mapakh.wav')
      },
      {
        symbol:  require('../assets/8-pashta.png'),
        sound: require('../assets/8-pashta.wav')
      },
      {
        symbol: require('../assets/9-zakef.png'),
        sound: require('../assets/9-zakef.wav')
      },
      {
        symbol: require('../assets/10-kadma-v-geresh.png'),
        sound: require('../assets/10-kadma-v-geresh.wav')
      },
      {
        symbol: require('../assets/11-gereshayim.png'),
        sound: require('../assets/11-gershayim.wav')
      },
      {
        symbol: require('../assets/12-tevir.png'),
        sound: require('../assets/12-tevir.wav')
      },
      {
        symbol: require('../assets/13-darga.png'),
        sound: require('../assets/13-darga.wav')
      },
      {
        symbol: require('../assets/zarka.png'),
        sound: require('../assets/14-zarka.wav')
      },
      {
        symbol: require('../assets/15-segol.png'),
        sound: require('../assets/15-segol.wav')
      },
      {
        symbol: require('../assets/16-revia.png'),
        sound: require('../assets/16-revia.wav')
      },
      {
        symbol:  require('../assets/17-telisha-katana.png'),
        sound: require('../assets/17-telisha-kitana.wav')
      },
      {
        symbol: require('../assets/18-telishah-gedolah.png'),
        sound: require('../assets/18-telisha-gedola.wav')
      },
      {
        symbol: require('../assets/19-pazer.png'),
        sound: require('../assets/19-pazer.wav')
      }
    ]
  },
  {
    name: 'Haftarah',
    symbols: [
      {
        symbol: 'A',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'B',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'C',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'D',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'E',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'F',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'G',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'H',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'I',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'J',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'K',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'L',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'M',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'N',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'O',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'P',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'Q',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'R',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'S',
        sound: require('../assets/A.wav')
      }
    ]
  },
  {
    name: 'HHD',
    symbols: [
      {
        symbol: 'A',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'B',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'C',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'D',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'E',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'F',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'G',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'H',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'I',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'J',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'K',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'L',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'M',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'N',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'O',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'P',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'Q',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'R',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'S',
        sound: require('../assets/A.wav')
      }
    ]
  },
  {
    name: 'Ruth',
    symbols: [
      {
        symbol: 'A',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'B',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'C',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'D',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'E',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'F',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'G',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'H',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'I',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'J',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'K',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'L',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'M',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'N',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'O',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'P',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'Q',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'R',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'S',
        sound: require('../assets/A.wav')
      }
    ]
  },
  {
    name: 'Esther',
    symbols: [
      {
        symbol: 'A',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'B',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'C',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'D',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'E',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'F',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'G',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'H',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'I',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'J',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'K',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'L',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'M',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'N',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'O',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'P',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'Q',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'R',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'S',
        sound: require('../assets/A.wav')
      }
    ]
  },
  {
    name: 'Lamentation',
    symbols: [
      {
        symbol: 'A',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'B',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'C',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'D',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'E',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'F',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'G',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'H',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'I',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'J',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'K',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'L',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'M',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'N',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'O',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'P',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'Q',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'R',
        sound: require('../assets/A.wav')
      },
      {
        symbol: 'S',
        sound: require('../assets/A.wav')
      }
    ]
  }
]

export default systemsArr
