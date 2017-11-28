import constantsMain from 'app-constants/main.js'
import constantsDev from 'app-constants/development.js'
import constantsProd from 'app-constants/production.js'

export default Object.assign({}, constantsMain, process.env.NODE_ENV === 'production' ? constantsProd : constantsDev)
