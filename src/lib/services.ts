/**
 * Service pages. The site is service-led: visitors arrive with a problem or a job
 * ("projector not working", "need CCTV for my shop") and should call or WhatsApp.
 *
 * Scope note (see docs/client-content-needed.md, section D): the agency confirmed on
 * 26 Oct 2026 that Europa is a services business (repair, installation, setup and supply).
 * Do NOT add promises that are still unconfirmed: same-day visits, doorstep service,
 * fixed prices, warranties, response times, authorised-dealer status.
 */
import { photos, type Photo } from './images'

export type Service = {
  slug: string
  path: string
  /** Analytics-safe key, also the enquiry form value */
  key: string
  navLabel: string
  title: string
  description: string
  h1: string
  lede: string
  heroImage: Photo
  /** What customers come to us with. Each becomes a WhatsApp quick link. */
  needsHeading: string
  needs: string[]
  offerHeading: string
  offer: { title: string; text: string; image?: Photo }[]
  brands?: { label: string; list: string[] }[]
  faqs: { q: string; a: string }[]
  whatsappMessage: string
  ctaLabel: string
  related: string[]
}

const projectorBrands = ['Epson', 'BenQ', 'Panasonic', 'Hitachi', 'Sony', 'LG', 'Samsung', 'Optoma']
const cctvBrands = ['CP Plus', 'Hikvision', 'TP-Link']
const receiverBrands = ['Marantz', 'Denon', 'Sony', 'Yamaha', 'Onkyo', 'Anthem', 'Pioneer']

const areaFaq = {
  q: 'Do you cover my area?',
  a: 'We are based in New Balaji Nagar, Kukatpally and work in a limited area around it, not all of Hyderabad. Tell us your locality when you call or WhatsApp and we will confirm.',
}

export const services: Service[] = [
  {
    slug: 'projector-repair',
    path: '/projector-repair/',
    key: 'projector-repair',
    navLabel: 'Projector Repair',
    title: 'Projector Repair & Service in Kukatpally',
    description:
      'Projector not working? Call or WhatsApp Europa Office Systems, Kukatpally, Hyderabad for projector repair and service. Epson, BenQ, Panasonic, Sony, Optoma and more.',
    h1: 'Projector repair and service in Kukatpally',
    lede: 'Projector not turning on, picture dim or blurry, or showing “no signal”? Call or WhatsApp us with the brand, the model and the problem.',
    heroImage: photos.projectorLens,
    needsHeading: 'Is your projector doing this?',
    needs: [
      'Projector not turning on',
      'Lamp light blinking or lamp warning',
      'Picture dim, yellow or faded',
      'Blurry or out-of-focus picture',
      'Spots, lines or dust on the picture',
      'Switching off or overheating',
      'No signal from laptop or HDMI',
      'Loud fan noise',
      'Remote or buttons not working',
    ],
    offerHeading: 'Projector service',
    offer: [
      { title: 'Diagnosis and repair', text: 'Tell us what the projector is doing. We check the fault and explain what is needed before going ahead.', image: photos.circuitRepair },
      { title: 'Lamp and picture problems', text: 'Dim, yellow or patchy pictures, lamp warnings and focus problems in office, classroom and home projectors.', image: photos.benqProjector },
      { title: 'Cleaning and servicing', text: 'Dust on the lens and filters causes spots, overheating and shutdowns. Regular servicing helps projectors in daily use.' },
      { title: 'Connection problems', text: '“No signal”, HDMI and laptop connection issues, often a cable, setting or input problem.' },
    ],
    brands: [{ label: 'Projector brands we handle', list: projectorBrands }],
    faqs: [
      { q: 'Which projector brands do you service?', a: `We handle ${projectorBrands.join(', ')} projectors. Send the model number on WhatsApp and we will confirm.` },
      { q: 'What should I tell you when I call?', a: 'The brand and model (on the label underneath), what the projector is doing, and your area. A photo or short video of the problem on WhatsApp helps a lot.' },
      { q: 'How much does projector repair cost?', a: 'It depends on the fault and any parts needed, so we tell you after checking the problem. Call or WhatsApp us to start.' },
      areaFaq,
    ],
    whatsappMessage: 'Hello Europa Office Systems, my projector needs repair. Brand/model: ___. Problem: ___. Area: ___.',
    ctaLabel: 'Book Projector Repair',
    related: ['projector-installation', 'home-theatre-installation'],
  },
  {
    slug: 'projector-installation',
    path: '/projector-installation/',
    key: 'projector-installation',
    navLabel: 'Projector & Screen Installation',
    title: 'Projector & Screen Installation in Hyderabad',
    description:
      'New projector for your office, classroom or home? Europa Office Systems, Kukatpally supplies and installs projectors and tripod, wall-mounted and motorised screens.',
    h1: 'Projector and screen installation',
    lede: 'Setting up a meeting room, classroom or home cinema? We supply projectors and screens and set them up for your room.',
    heroImage: photos.ceilingProjector,
    needsHeading: 'What do you need?',
    needs: [
      'New projector for a meeting room',
      'Projector for a classroom or training room',
      'Projector for home cinema',
      'Ceiling mounting a projector',
      'Motorised projector screen',
      'Wall-mounted or tripod screen',
      'Acoustic screen with speakers behind',
      'Moving a projector to another room',
    ],
    offerHeading: 'Projectors and screens',
    offer: [
      { title: 'Projector supply', text: 'Office, classroom and home cinema projectors from the brands we handle, chosen for your room size and lighting.', image: photos.classroomProjector },
      { title: 'Ceiling and wall mounting', text: 'Projector mounted at the right distance and height for the screen size you want, with cables planned.', image: photos.ceilingProjector },
      { title: 'Projector screens', text: 'Tripod screens for portable use, wall-mounted and motorised screens for permanent rooms, and acoustic screens for home theatres.', image: photos.livingRoomScreen },
      { title: 'Connection and setup', text: 'HDMI and laptop connections, picture alignment and focus, so it is ready to use.', image: photos.classroomScreen },
    ],
    brands: [{ label: 'Projector brands we handle', list: projectorBrands }],
    faqs: [
      { q: 'Which projector should I buy?', a: 'It depends on the room size, how bright the room is and what you will show. Tell us about the room and we will suggest options and send a quotation.' },
      { q: 'Which screen types do you supply?', a: 'Tripod, wall-mounted, motorised and acoustic projector screens.' },
      { q: 'What does installation cost?', a: 'It depends on the room, mounting and cabling. Share the details or photos on WhatsApp and we will quote.' },
      areaFaq,
    ],
    whatsappMessage: 'Hello Europa Office Systems, I need a projector / screen installed. Room: ___. Area: ___.',
    ctaLabel: 'Get an Installation Quote',
    related: ['projector-repair', 'home-theatre-installation'],
  },
  {
    slug: 'cctv-installation',
    path: '/cctv-installation/',
    key: 'cctv',
    navLabel: 'CCTV Installation',
    title: 'CCTV Camera Installation & Service in Hyderabad',
    description:
      'CCTV cameras for home, shop or office, or cameras not working? Europa Office Systems, Kukatpally, installs and services CP Plus, Hikvision and TP-Link CCTV. Call or WhatsApp.',
    h1: 'CCTV camera installation and service',
    lede: 'New CCTV for your home, shop or office, or cameras that have stopped working? Call or WhatsApp us.',
    heroImage: photos.cctvTechnician,
    needsHeading: 'What do you need help with?',
    needs: [
      'New CCTV for home',
      'New CCTV for shop or office',
      'Camera showing no video',
      'CCTV not recording',
      'Cannot view cameras on mobile',
      'Night vision not working',
      'Blurry or dark footage',
      'Adding more cameras',
    ],
    offerHeading: 'CCTV service',
    offer: [
      { title: 'New CCTV installation', text: 'Cameras placed to cover your gates, doors, counters and parking, with the recorder and cabling set up.', image: photos.bulletCamera },
      { title: 'Home and Wi-Fi cameras', text: 'Cameras for homes and small spaces, set up to view on your phone.', image: photos.wifiCamera },
      { title: 'Recorder and mobile viewing', text: 'DVR / NVR recording, hard disk storage and mobile app viewing set up so you can check cameras from anywhere.', image: photos.dvrMonitor },
      { title: 'CCTV not working', text: 'Cameras with no picture, recording stopped, or the mobile app not connecting. Tell us what you see.' },
    ],
    brands: [{ label: 'CCTV brands we handle', list: cctvBrands }],
    faqs: [
      { q: 'Which CCTV brands do you work with?', a: `${cctvBrands.join(', ')}. Ask us which suits your home or business.` },
      { q: 'How many cameras do I need?', a: 'It depends on the entrances, rooms and outside areas you want to see. Send photos or a rough description on WhatsApp and we will suggest a setup.' },
      { q: 'Can I see the cameras on my phone?', a: 'Most current CCTV systems can be viewed on a mobile app when the recorder is connected to the internet. We can set this up.' },
      areaFaq,
    ],
    whatsappMessage: 'Hello Europa Office Systems, I need help with CCTV. Home / shop / office: ___. Requirement or problem: ___. Area: ___.',
    ctaLabel: 'Get a CCTV Quote',
    related: ['projector-installation', 'home-theatre-installation'],
  },
  {
    slug: 'home-theatre-installation',
    path: '/home-theatre-installation/',
    key: 'home-theatre',
    navLabel: 'Home Theatre Setup',
    title: 'Home Theatre Setup & Installation in Kukatpally',
    description:
      'Home theatre setup in Kukatpally, Hyderabad: projector, screen, AV receiver (Denon, Marantz, Yamaha and more) and speakers supplied and set up by Europa Office Systems.',
    h1: 'Home theatre setup and installation',
    lede: 'Planning a home theatre or upgrading your sound? We supply and set up projectors, screens, AV receivers and speakers.',
    heroImage: photos.theatreRoom,
    needsHeading: 'What are you planning?',
    needs: [
      'New home theatre room',
      'Projector and screen for the living room',
      'AV receiver and surround speakers',
      'Hi-fi speakers for music',
      'No sound from some speakers',
      'TV / HDMI ARC sound problems',
      'Upgrading an old system',
    ],
    offerHeading: 'Home theatre',
    offer: [
      { title: 'Complete home theatre', text: 'Projector, screen, AV receiver and speakers planned together for your room and seating.', image: photos.theatreRecliners },
      { title: 'AV receivers', text: 'Surround sound receivers connected to your TV or projector, speakers and media players.', image: photos.avReceiver },
      { title: 'Speakers', text: 'Floorstanding, bookshelf, centre, surround speakers and subwoofers placed and set up for the room.', image: photos.theatreSpeakers },
      { title: 'Sound problems', text: 'Speakers not working, no surround sound, or TV sound not coming through the receiver.', image: photos.bookshelfSpeaker },
    ],
    brands: [
      { label: 'AV receiver brands we handle', list: receiverBrands },
      { label: 'Projector brands we handle', list: projectorBrands },
    ],
    faqs: [
      { q: 'What do you need to know to plan a home theatre?', a: 'The room size, where people will sit, how much light the room gets, your budget range and any equipment you already have. Photos on WhatsApp help.' },
      { q: 'Can you work with equipment I already own?', a: 'Yes. Tell us what you have and we will suggest what to add or replace.' },
      { q: 'Do you also supply acoustic panels?', a: 'Yes. Acoustic panels reduce echo and make dialogue clearer in home theatres.' },
      areaFaq,
    ],
    whatsappMessage: 'Hello Europa Office Systems, I am interested in a home theatre setup. Room size: ___. Area: ___.',
    ctaLabel: 'Plan Your Home Theatre',
    related: ['acoustic-panel-installation', 'projector-installation'],
  },
  {
    slug: 'acoustic-panel-installation',
    path: '/acoustic-panel-installation/',
    key: 'acoustic-panels',
    navLabel: 'Acoustic Panels',
    title: 'Acoustic Panels Supply & Installation, Hyderabad',
    description:
      'Echo in your home theatre, meeting room or studio? Europa Office Systems, Kukatpally supplies and fixes acoustic panels to make sound clearer. Call or WhatsApp.',
    h1: 'Acoustic panels for home theatres, offices and studios',
    lede: 'Echo in your home theatre, meeting room or studio? Acoustic panels make speech and sound clearer. Call or WhatsApp us.',
    heroImage: photos.acousticPanels,
    needsHeading: 'Where is the echo?',
    needs: [
      'Echo in a home theatre',
      'Meeting room echo on video calls',
      'Music room or studio treatment',
      'Panels to match the interiors',
    ],
    offerHeading: 'Acoustic treatment',
    offer: [
      { title: 'Fabric acoustic panels', text: 'Wall panels that absorb echo, in colours that suit the room.', image: photos.acousticPanels },
      { title: 'Wooden acoustic panels', text: 'Slatted and wooden finishes for rooms where appearance matters.', image: photos.woodPanels },
      { title: 'Placement', text: 'Panels placed where sound reflects most, so a room improves without covering every wall.' },
    ],
    faqs: [
      { q: 'Will acoustic panels soundproof my room?', a: 'No. Acoustic panels reduce echo inside the room. Stopping sound going through walls is construction work.' },
      { q: 'How many panels do I need?', a: 'It depends on the room size and surfaces. Send the room size and a few photos on WhatsApp and we will suggest a quantity.' },
      areaFaq,
    ],
    whatsappMessage: 'Hello Europa Office Systems, I need acoustic panels. Room type and size: ___. Area: ___.',
    ctaLabel: 'Ask About Acoustic Panels',
    related: ['home-theatre-installation', 'projector-installation'],
  },
]

export function getService(slug: string): Service {
  const s = services.find((x) => x.slug === slug)
  if (!s) throw new Error(`Unknown service: ${slug}`)
  return s
}

/** Options for the enquiry form. Values are analytics-safe keys. */
export const enquiryCategoryOptions = [
  ...services.map((s) => ({ value: s.key, label: s.navLabel })),
  { value: 'other', label: 'Something else' },
] as const

export const defaultWhatsappMessage = 'Hello Europa Office Systems, I need help with: ___. Area: ___.'

/** WhatsApp message for a specific problem or job. */
export const needMessage = (need: string) => `Hello Europa Office Systems, I need help: ${need}. Area: ___.`

/** All brands, grouped once (for the brands page and llms.txt). */
export const brandGroups = [
  { label: 'Projectors', list: projectorBrands, path: '/projector-repair/' },
  { label: 'CCTV', list: cctvBrands, path: '/cctv-installation/' },
  { label: 'AV receivers', list: receiverBrands, path: '/home-theatre-installation/' },
]
