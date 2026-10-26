/**
 * Photo registry. Every photo here is a stock photo under the Unsplash License
 * (free commercial use, no attribution required; credited anyway in docs/image-seo-inventory.md).
 * They are ILLUSTRATIVE: none shows Europa Office Systems' own work. Replace with real
 * job photos as soon as the client supplies them (real photos are what rank in Google Images).
 *
 * Files live in /public/images as `<name>-640.webp` and `<name>-1280.webp` (3:2).
 */

export type Photo = {
  name: string
  alt: string
  credit: string
  source: string
}

const p = (name: string, alt: string, credit: string, id: string): Photo => ({
  name,
  alt,
  credit,
  source: `https://unsplash.com/photos/${id}`,
})

export const photos = {
  projectorLens: p('projector-repair-service-hyderabad', 'Close-up of a projector lens during projector service', 'Kevin “KevDoy” Doyle', 'iihXfbL342c'),
  benqProjector: p('benq-projector-service-kukatpally', 'BenQ projector front view showing the lens', 'Arūnas Naujokas', 'EEnJpGHkU4k'),
  circuitRepair: p('projector-circuit-board-repair', 'Technician handling an electronic circuit board during repair', 'ThisisEngineering', '32PpagSzeGs'),
  ceilingProjector: p('ceiling-mounted-projector-installation', 'Projector mounted on a ceiling bracket', 'Nitish Lakra', 'lRpdB487Aos'),
  classroomProjector: p('classroom-projector-screen-installation', 'Training room with a presentation on a projector screen', 'Quilia', '1-aA2Fadydc'),
  projectorBeam: p('projector-light-beam-home-cinema', 'Projector beaming light in a dark room', 'Alex Litvin', 'MAYsdoYpGuk'),
  cctvTechnician: p('cctv-camera-installation-technician', 'Technician fixing a CCTV camera to a wall', 'Bermix Studio', 'bAGo7O4prtY'),
  cctvCameras: p('cctv-cameras-supply-hyderabad', 'Rows of CCTV bullet cameras on a wall', 'Lianhao Qu', 'LfaN1gswV5c'),
  wifiCamera: p('wifi-dome-cctv-camera-home', 'Wi-Fi security camera mounted on a house wall', 'Alan J. Hendry', 'KNt4zd8HPb0'),
  bulletCamera: p('bullet-cctv-camera-mounting', 'Bullet CCTV camera on a ceiling mount', 'Franck V.', 'ujSsIk5iZmA'),
  dvrMonitor: p('cctv-dvr-monitor-live-view', 'CCTV monitor showing live camera views next to the recorder', 'Luis Angel Ponce Alvarez', 'INHrB7zV-C0'),
  theatreRoom: p('home-theatre-room-projector-screen', 'Home theatre room with a large projector screen and seating', 'IRa Kang', 'RBWK3YcwIOQ'),
  theatreRecliners: p('home-theatre-recliner-seating-setup', 'Home theatre with recliner seats facing a projected picture', 'Elite prop', 'bVTjOXEmUbE'),
  livingRoomScreen: p('living-room-projector-screen-setup', 'Living room with a wall-mounted projector screen', 'Im3rd Media', 'vDHEF40AQb8'),
  theatreSpeakers: p('home-theatre-speakers-tv-setup', 'Home theatre with floorstanding speakers either side of the screen', 'MING', 'BXKF-rHHbT4'),
  classroomScreen: p('classroom-projection-screen', 'Classroom with a projector and projection screen', 'Ahmed Siddiqui', 'DfuZPZxoxwQ'),
  acousticPanels: p('acoustic-panels-wall-installation', 'Fabric acoustic panels fixed to a meeting room wall', 'Madeline Liu', 'iLlnYYHM17Y'),
  woodPanels: p('wooden-acoustic-diffuser-panels', 'Wooden slatted acoustic wall treatment', 'Declan Sun', 'MEUtre4hH3o'),
  avReceiver: p('av-receiver-home-theatre-setup', 'AV receiver on a living room cabinet', 'Daria Strategy', 'P868x_ce_X4'),
  bookshelfSpeaker: p('bookshelf-hifi-speaker', 'Bookshelf hi-fi speaker', 'Josh Sorenson', 'u8-QI4tRES0'),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export const photoSrc = (photo: Photo, width: 640 | 1280 = 1280) => `/images/${photo.name}-${width}.webp`
