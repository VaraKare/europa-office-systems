import { business } from './site'

/**
 * Official click-to-chat format: https://wa.me/<digits>?text=<urlencoded>
 * Opening the link only starts a chat with the message pre-filled; the visitor still
 * has to press send.
 */
export function whatsappUrl(message: string, digits: string = business.phone.whatsappDigits) {
  const clean = digits.replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}
