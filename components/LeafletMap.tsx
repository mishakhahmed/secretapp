"use client"

import { useEffect } from "react"

export default function LeafletMap() {
  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Check if map already exists
      const container = document.getElementById("map")
      if (!container) return

      // Remove existing map if any
      if ((container as any)._leaflet_id) {
        return
      }

      const map = L.map("map", {
        center: [23.7095, 90.41],
        zoom: 15,
        zoomControl: true,
        dragging: true,
        tap: false,
        touchZoom: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        inertia: true,
        inertiaDeceleration: 3000,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map)

      // Yellow marker
      const yellowIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      })

      // Core locations
      const locations = [
        {
          name: "🏛 Rose Garden",
          coords: [23.7106, 90.4156] as [number, number],
          story:
            "Once the mansion of a zamindar who filled his garden with imported roses. Later became a hub of politics where leaders dreamed of Pakistan. Today, its arches hold the memory of perfume and power.",
        },
        {
          name: "🏨 Beauty Boarding",
          coords: [23.7083, 90.4091] as [number, number],
          story:
            "A century-old guesthouse that hosted poets, artists, and rebels. The walls of Beauty Boarding still echo with tea-soaked conversations about art and resistance.",
        },
        {
          name: "🏛 Northbrook Hall",
          coords: [23.7096, 90.4065] as [number, number],
          story:
            "Built in 1880 in honor of Lord Northbrook, this Indo-Saracenic hall was once Dhaka's cultural heart. Dances, plays, and literary meets were staged under its domes.",
        },
        {
          name: "🏛 Ruplal House",
          coords: [23.7084, 90.4057] as [number, number],
          story:
            "The ballroom of the Buriganga. In 1886, a Viceroy danced under its chandeliers. Today, it stands in decay, river winds still whispering through its broken arches.",
        },
        {
          name: "🏛 Mongolabash",
          coords: [23.7079, 90.4069] as [number, number],
          story:
            "A historic merchant house, once alive with trade and chatter. Its courtyards now hold shadows of forgotten wealth and the quiet resilience of Old Dhaka.",
        },
      ]

      // Add markers with styled popups
      locations.forEach((loc) => {
        const popupContent = `
          <div class="popup-card">
            <h3>${loc.name}</h3>
            <p>${loc.story}</p>
            <div class="author">
              <i>By <a href="http://www.mishakahmed.com" target="_blank">Mishak Husain Ahmed</a></i>
            </div>
            <div class="tags">#secretsbd #secretsbangladesh</div>
          </div>
        `
        L.marker(loc.coords, { icon: yellowIcon }).addTo(map).bindPopup(popupContent)
      })

      // Lalbagh Fort with wax seal + PDF
      const lalbaghPopup = `
        <div class="popup-card" style="text-align:center;">
          <h3>🕌 Lalbagh Fort</h3>
          <p>Begun in 1678 by Prince Muhammad Azam, Lalbagh Fort remains an unfinished Mughal dream. Its red bricks carry stories of ambition, loss, and the eternal river winds of Dhaka.</p>
          <img src="/assets/Secrets-wax-seal.png" alt="Secrets Wax Seal" class="seal"/>
          <a href="/assets/scrolls/lalbagh.pdf" target="_blank" class="download-btn">
            📜 Download Story Scroll (PDF)
          </a>
          <div class="author">
            <i>By <a href="http://www.mishakahmed.com" target="_blank">Mishak Husain Ahmed</a></i>
          </div>
          <div class="tags">#secretsbd #secretsbangladesh</div>
        </div>
      `

      L.marker([23.7189, 90.3886], { icon: yellowIcon }).addTo(map).bindPopup(lalbaghPopup)

      const legend = L.control({ position: "bottomright" })
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend")
        div.innerHTML = `
          <h4 id="legend-toggle">Legend ⬆</h4>
          <div id="legend-body" class="legend-body" style="display:none;">
            🏛 Heritage Houses<br>
            🏨 Hospitality / Boarding<br>
            🕌 Forts & Monuments
          </div>
        `

        // Add click handler after DOM is ready
        setTimeout(() => {
          const toggle = div.querySelector("#legend-toggle")
          const body = div.querySelector("#legend-body")
          if (toggle && body) {
            toggle.addEventListener("click", () => {
              if (body.style.display === "none") {
                body.style.display = "block"
                toggle.innerHTML = "Legend ⬇"
              } else {
                body.style.display = "none"
                toggle.innerHTML = "Legend ⬆"
              }
            })
          }
        }, 100)

        return div
      }
      legend.addTo(map)

      // Cleanup
      return () => {
        map.remove()
      }
    })
  }, [])

  return <div id="map" style={{ height: "100%", width: "100%" }} />
}
