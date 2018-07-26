import Ecoji   from './src/Ecoji'
import emoji   from './src/emojis'
/* tslint:disable-next-line:no-unused-expression */
import './src/ext'
import Mapping from './src/Mapping'

export default new Ecoji(new Mapping(emoji))
