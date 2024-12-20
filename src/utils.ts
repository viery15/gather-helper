import dayjs from 'dayjs'
import { Data } from './types'

export const getTabId = async () => {
  const tabs = await chrome.tabs.query({ url: 'https://app.gather.town/app/*' })
  const tab = tabs.find((tab) => {
    if (tab.url != null) {
      const url = new URL(tab.url)
      return url.pathname.match(/app\/.+/)
    }
  })
  return tab?.id ?? undefined
}