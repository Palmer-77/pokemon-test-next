import 'dayjs/locale/th'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import DayjsBuddhistEra from 'dayjs/plugin/buddhistEra'
import DayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'
import DayjsLocalizeFormat from 'dayjs/plugin/localizedFormat'
import DayjsTimezone from 'dayjs/plugin/timezone'
import DayjsUtc from 'dayjs/plugin/utc'

dayjs.locale('th')
dayjs.extend(DayjsLocalizeFormat)
dayjs.extend(DayjsCustomParseFormat)
dayjs.extend(DayjsBuddhistEra)
dayjs.extend(DayjsTimezone)
dayjs.extend(DayjsUtc)
dayjs.extend(advancedFormat)

export default dayjs
