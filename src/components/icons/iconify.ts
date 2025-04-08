import { addCollection } from '@iconify/react'

import { IconifyIconsets } from './iconsets'

IconifyIconsets.forEach((iconset) => {
  addCollection(iconset)
})
