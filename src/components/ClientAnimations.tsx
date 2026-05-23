'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClientAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. LIVE bug glow pulse
      gsap.to('.live-bug', {
        boxShadow: '0 0 10px rgba(255,40,40,0.9), 0 0 3px rgba(255,80,80,0.5)',
        duration: 0.75, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })

      // 2. TeleMensajero slide up
      gsap.fromTo('#telemensajero',
        { y: 70, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, delay: 2.6, ease: 'power2.out' }
      )

      // 4. Show cards entrance on scroll
      gsap.from('.show-card', {
        y: 14, opacity: 0, stagger: 0.07, duration: 0.35,
        scrollTrigger: { trigger: '.show-cards', start: 'top 88%', toggleActions: 'play none none none' }
      })

      // 5. News items entrance
      gsap.from('.news-list li', {
        x: -10, opacity: 0, stagger: 0.09, duration: 0.3,
        scrollTrigger: { trigger: '.news-list', start: 'top 88%' }
      })

      // 6. Ads border flash (periodic)
      const flashAd = () => {
        const ads = document.querySelectorAll<HTMLElement>('.ad-block')
        ads.forEach(ad => {
          gsap.to(ad, { borderColor: '#ffcc00', duration: 0.15, yoyo: true, repeat: 3, ease: 'none' })
        })
      }
      setTimeout(() => { flashAd(); setInterval(flashAd, 11000) }, 4000)

    })

    return () => ctx.revert()
  }, [])

  return null
}
