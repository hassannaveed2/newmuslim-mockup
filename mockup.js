// Mockup-only interactions. No data is sent anywhere.

// Mobile menu
document.querySelectorAll('[data-menu]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const nav = document.querySelector('.mobile-nav')
    const open = nav.classList.toggle('open')
    btn.setAttribute('aria-expanded', String(open))
  })
})

// Header gains a border/shadow once the page scrolls
const header = document.querySelector('[data-header]')
const progress = document.querySelector('[data-progress]')
const article = document.querySelector('.prose')
const onScroll = () => {
  header?.classList.toggle('scrolled', scrollY > 8)
  if (progress && article) {
    const r = article.getBoundingClientRect()
    const pct = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight * 0.6)))
    progress.style.width = pct * 100 + '%'
  }
}
addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Scroll reveal
const revealIO = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      e.target.classList.add('in')
      revealIO.unobserve(e.target)
    }),
  { rootMargin: '0px 0px -8% 0px' },
)
document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el))

// Toggle buttons: save, filters, "moved"
const toggle = (selector, onChange) =>
  document.querySelectorAll(selector).forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const on = el.getAttribute('aria-pressed') !== 'true'
      el.setAttribute('aria-pressed', String(on))
      onChange?.(el, on)
    }),
  )

toggle('[data-save]', (el, on) => el.setAttribute('aria-label', on ? 'Saved' : 'Save story'))
toggle('[data-moved]', (el, on) => {
  const count = el.querySelector('[data-count]')
  if (count) count.textContent = String(Number(count.textContent) + (on ? 1 : -1))
})

document.querySelectorAll('[data-filter]').forEach((el) =>
  el.addEventListener('click', () => el.classList.toggle('active')),
)

// Video facade: in production this swaps in a youtube-nocookie.com iframe on click
document.querySelectorAll('[data-video]').forEach((el) =>
  el.addEventListener('click', () => {
    el.innerHTML =
      '<div style="position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:600 15px Inter,sans-serif;text-align:center;padding:24px">YouTube video would play here<br><span style="font-weight:400;opacity:.7">(loaded on click to keep pages fast and private)</span></div>'
  }),
)

// Story page: highlight the current section in the table of contents
const tocLinks = document.querySelectorAll('.toc a')
if (tocLinks.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        tocLinks.forEach((a) => a.classList.toggle('on', a.hash === '#' + entry.target.id))
      }),
    { rootMargin: '-30% 0px -60% 0px' },
  )
  document.querySelectorAll('.prose h2[id]').forEach((h) => io.observe(h))
}

// Story map: dotted land from Natural Earth (world-atlas) + storyteller pins
const mapEl = document.querySelector('[data-map]')
const STORYTELLERS = [
  { name: 'Hannah', place: 'Manchester, UK', ll: [-2.24, 53.48], img: 'hero-dawn.jpg', t: 'The first time I held a Quran, I wept.' },
  { name: 'Khadija', place: 'Atlanta, USA', ll: [-84.39, 33.75], img: 'story-atlanta.jpg', t: 'My grandmother’s Bible is still on my table.' },
  { name: 'Aisha', place: 'Manila, Philippines', ll: [120.98, 14.6], img: 'story-manila.jpg', t: 'I learned Al-Fatiha on our lunch breaks.' },
  { name: 'Kenji', place: 'Kyoto, Japan', ll: [135.77, 35.01], img: 'story-kyoto.jpg', t: 'Silence was my religion. Then I heard the adhan.' },
  { name: 'Jonas', place: 'Berlin, Germany', ll: [13.4, 52.52], img: 'story-berlin.jpg', t: 'As an engineer I wanted proof.' },
  { name: 'Noor', place: 'Pune, India', ll: [73.86, 18.52], img: 'story-pune.jpg', t: 'I read the Quran in secret for two years.' },
  { name: 'Lucas', place: 'São Paulo, Brazil', ll: [-46.63, -23.55], img: 'story-saopaulo.jpg', t: 'My first Ramadan was the loneliest — and most loved.' },
  { name: 'Fiona', place: 'Inverness, Scotland', ll: [-4.22, 57.48], img: 'story-highlands.jpg', t: 'He was closer than I thought.' },
  { name: 'The Ramírez family', place: 'Guadalajara, Mexico', ll: [-103.35, 20.66], img: 'story-guadalajara.jpg', t: 'We became Muslim together.' },
  { name: 'Ji-woo', place: 'Seoul, South Korea', ll: [126.98, 37.57], img: 'short-cafe.jpg', t: 'The day I wore hijab to work.' },
  { name: 'Erik', place: 'Stockholm, Sweden', ll: [18.07, 59.33], img: 'short-snow.jpg', t: 'At 63, I walked into a mosque for the first time.' },
  { name: 'Mariam', place: 'Warsaw, Poland', ll: [21.01, 52.23], img: 'video-iftar.jpg', t: '200 strangers felt like family.' },
  { name: 'Ethan', place: 'Sydney, Australia', ll: [151.21, -33.87], img: 'video-mentor.jpg', t: 'A mentor who never rushed me.' },
  { name: 'Daniel', place: 'London, UK', ll: [-0.13, 51.5], img: 'video-interview.jpg', t: 'From the church choir to the masjid.' },
  { name: 'Thandiwe', place: 'Cape Town, South Africa', ll: [18.42, -33.92], img: 'share-notebook.jpg', t: 'I found it in my grandfather’s letters.' },
  { name: 'Anonymous', place: 'Toronto, Canada', ll: [-79.38, 43.65], img: 'short-wudu.jpg', t: 'I learned wudu from a stranger.' },
]

if (mapEl && window.d3 && window.topojson) {
  const canvas = mapEl.querySelector('canvas')
  const card = mapEl.querySelector('[data-pin-card]')
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json')
    .then((r) => r.json())
    .then((topo) => {
      const land = topojson.feature(topo, topo.objects.land)
      const draw = () => {
        const w = mapEl.clientWidth
        const h = mapEl.clientHeight
        const dpr = Math.min(2, devicePixelRatio || 1)
        // Crop out Antarctica: fit to the map's edge points (lat 78°N to 56°S) instead of the whole sphere
        const edges = { type: 'MultiPoint', coordinates: [[-180, 0], [180, 0], [0, 78], [0, -56], [-180, 78], [180, -56]] }
        const proj = d3.geoNaturalEarth1().fitSize([w, h], edges)

        // Rasterise land once at 1x, then sample it on a grid to place dots
        const off = document.createElement('canvas')
        off.width = w
        off.height = h
        const octx = off.getContext('2d')
        octx.fillStyle = '#000'
        octx.beginPath()
        d3.geoPath(proj, octx)(land)
        octx.fill()
        const px = octx.getImageData(0, 0, w, h).data

        canvas.width = w * dpr
        canvas.height = h * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)
        ctx.clearRect(0, 0, w, h)
        const step = Math.max(5, Math.round(w / 150))
        for (let y = step / 2; y < h; y += step) {
          for (let x = step / 2; x < w; x += step) {
            if (px[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 0) {
              ctx.beginPath()
              ctx.arc(x, y, step * 0.28, 0, Math.PI * 2)
              ctx.fillStyle = 'rgba(184, 214, 207, 0.32)'
              ctx.fill()
            }
          }
        }

        mapEl.querySelectorAll('.pin').forEach((p) => p.remove())
        STORYTELLERS.forEach((s, i) => {
          const [x, y] = proj(s.ll)
          const pin = document.createElement('a')
          pin.className = 'pin'
          pin.href = 'story.html'
          pin.style.left = x + 'px'
          pin.style.top = y + 'px'
          pin.style.setProperty('--d', (i * 0.37) % 2.8 + 's')
          pin.setAttribute('aria-label', `${s.name}, ${s.place}`)
          const show = () => {
            card.querySelector('img').src = 'images/' + s.img
            card.querySelector('.t').textContent = '“' + s.t + '”'
            card.querySelector('.m').textContent = s.name + ' · ' + s.place
            card.style.left = Math.min(Math.max(x, 130), w - 130) + 'px'
            card.style.top = y + 'px'
            card.classList.add('show')
          }
          pin.addEventListener('mouseenter', show)
          pin.addEventListener('focus', show)
          pin.addEventListener('mouseleave', () => card.classList.remove('show'))
          pin.addEventListener('blur', () => card.classList.remove('show'))
          mapEl.appendChild(pin)
        })
      }
      draw()
      let t
      addEventListener('resize', () => {
        clearTimeout(t)
        t = setTimeout(draw, 150)
      })
    })
    .catch(() => mapEl.insertAdjacentHTML('beforeend', '<p style="color:#a9c0bb">Map unavailable offline.</p>'))
}
