import { Product } from '../context/CartContext';

// BroadTech Plug - Premium Electronics Store
// Categories: Networking, Entertainment, Gaming, Solar Energy, Machinery

export const mockProducts: Product[] = [
  // ========== GAMING ==========
  {
    id: 'gm001',
    name: 'PS5 Pro',
    price: 103000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Next-generation PlayStation 5 Pro console with enhanced graphics, 8K support, and lightning-fast SSD for the ultimate gaming experience.',
    category: 'Gaming',
    stock: 8,
    rating: 4.9,
    reviews: 156
  },
  {
    id: 'gm002',
    name: 'PS5 Slim',
    price: 72000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Compact PS5 Slim with all the power of PlayStation 5 in a sleeker design. Includes ultra-fast SSD and 4K gaming.',
    category: 'Gaming',
    stock: 15,
    rating: 4.8,
    reviews: 203
  },
  {
    id: 'gm003',
    name: 'PS5 Digital',
    price: 62000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'All-digital PS5 console without disc drive. Experience next-gen gaming with digital downloads.',
    category: 'Gaming',
    stock: 12,
    rating: 4.7,
    reviews: 178
  },
  {
    id: 'gm004',
    name: 'PS5 Controllers',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'DualSense wireless controller with haptic feedback, adaptive triggers, and built-in microphone.',
    category: 'Gaming',
    stock: 45,
    rating: 4.8,
    reviews: 312
  },
  {
    id: 'gm005',
    name: 'Meta Quest 3 512GB',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Revolutionary mixed reality headset with 512GB storage. Experience immersive VR gaming and entertainment.',
    category: 'Gaming',
    stock: 6,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'gm006',
    name: 'Meta Quest 3s 256GB',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Compact Meta Quest 3s with 256GB storage for virtual reality adventures and mixed reality experiences.',
    category: 'Gaming',
    stock: 10,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 'gm007',
    name: 'Nintendo Switch 2',
    price: 68000,
    image: 'https://images.unsplash.com/photo-1676261233849-0755de764396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Latest Nintendo Switch 2 with enhanced performance. Play at home or on the go with hybrid gaming.',
    category: 'Gaming',
    stock: 18,
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'gm008',
    name: 'Nintendo Switch OLED',
    price: 37000,
    image: 'https://images.unsplash.com/photo-1676261233849-0755de764396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Nintendo Switch with vibrant 7-inch OLED screen, enhanced audio, and versatile gaming modes.',
    category: 'Gaming',
    stock: 22,
    rating: 4.7,
    reviews: 189
  },
  {
    id: 'gm009',
    name: 'Steam Deck OLED 512GB',
    price: 103000,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Portable PC gaming powerhouse with OLED display, 512GB NVMe SSD, and access to your Steam library.',
    category: 'Gaming',
    stock: 5,
    rating: 4.9,
    reviews: 134
  },
  {
    id: 'gm010',
    name: 'Steam Deck 1TB',
    price: 105000,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Ultimate Steam Deck with massive 1TB storage for extensive game library on the go.',
    category: 'Gaming',
    stock: 4,
    rating: 4.9,
    reviews: 98
  },
  {
    id: 'gm011',
    name: 'PS5 Portal',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'PlayStation Portal remote player for streaming PS5 games anywhere in your home.',
    category: 'Gaming',
    stock: 14,
    rating: 4.5,
    reviews: 76
  },
  {
    id: 'gm012',
    name: 'PS5 VR2 Horizon',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'PS VR2 headset with Horizon Call of the Mountain bundle. 4K HDR and eye tracking technology.',
    category: 'Gaming',
    stock: 7,
    rating: 4.8,
    reviews: 112
  },
  {
    id: 'gm013',
    name: 'PS5 Disk Drive',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Official PS5 disc drive attachment for digital edition consoles. Play physical games and Blu-rays.',
    category: 'Gaming',
    stock: 20,
    rating: 4.6,
    reviews: 45
  },
  {
    id: 'gm014',
    name: 'PS5 EDGE Controller',
    price: 27000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Pro-level DualSense Edge controller with customizable controls, replaceable stick modules, and carrying case.',
    category: 'Gaming',
    stock: 11,
    rating: 4.9,
    reviews: 87
  },
  {
    id: 'gm015',
    name: 'PS5 Vertical Stand',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Official vertical stand for PS5 consoles with secure attachment and sleek design.',
    category: 'Gaming',
    stock: 35,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'gm016',
    name: 'G29 Plus Shifter',
    price: 39000,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Logitech G29 racing wheel with force feedback and shifter bundle for realistic racing simulation.',
    category: 'Gaming',
    stock: 9,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 'gm017',
    name: 'Xbox X Controllers',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Xbox Series X/S wireless controller with textured grip, hybrid D-pad, and Share button.',
    category: 'Gaming',
    stock: 28,
    rating: 4.6,
    reviews: 198
  },
  {
    id: 'gm018',
    name: 'PS5 Elite Headset',
    price: 23000,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Premium 3D audio headset for PS5 with noise cancellation and 12-hour battery life.',
    category: 'Gaming',
    stock: 16,
    rating: 4.7,
    reviews: 143
  },

  // ========== ENTERTAINMENT ==========
  {
    id: 'en001',
    name: 'Fire Stick HD',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1694291546814-0c1e64b050a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Amazon Fire TV Stick HD for seamless streaming of Netflix, YouTube, Prime Video in Full HD.',
    category: 'Entertainment',
    stock: 50,
    rating: 4.5,
    reviews: 567
  },
  {
    id: 'en002',
    name: 'Fire Stick 4K',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1694291546814-0c1e64b050a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Fire TV Stick 4K with Alexa Voice Remote, Dolby Vision, HDR, and Dolby Atmos audio.',
    category: 'Entertainment',
    stock: 45,
    rating: 4.7,
    reviews: 489
  },
  {
    id: 'en003',
    name: 'Fire Stick 4K Max',
    price: 8800,
    image: 'https://images.unsplash.com/photo-1694291546814-0c1e64b050a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Most powerful Fire TV Stick with faster streaming, Wi-Fi 6, and 4K Ultra HD performance.',
    category: 'Entertainment',
    stock: 38,
    rating: 4.8,
    reviews: 412
  },
  {
    id: 'en004',
    name: 'Fire 7 Kids Pro',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Kid-friendly tablet with parental controls, 7-inch display, and 1 year Amazon Kids+ included.',
    category: 'Entertainment',
    stock: 25,
    rating: 4.4,
    reviews: 234
  },
  {
    id: 'en005',
    name: 'Fire HD 8 Kids Pro',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'HD 8-inch kids tablet with premium content, durable case, and 2-year worry-free guarantee.',
    category: 'Entertainment',
    stock: 20,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'en006',
    name: 'Fire HD 10 32GB Tablet',
    price: 17000,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '10.1-inch Full HD tablet, octa-core processor, 3GB RAM, perfect for streaming and browsing.',
    category: 'Entertainment',
    stock: 30,
    rating: 4.5,
    reviews: 345
  },
  {
    id: 'en007',
    name: 'Fire HD 10 Kids',
    price: 21000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '10-inch kids tablet with protective case, 1-year Amazon Kids+ content, and parental controls.',
    category: 'Entertainment',
    stock: 18,
    rating: 4.7,
    reviews: 267
  },
  {
    id: 'en008',
    name: 'Fire 10 Kids Pro',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Premium 10-inch kids tablet with ad-free content, educational apps, and slim case.',
    category: 'Entertainment',
    stock: 15,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'en009',
    name: 'Kindle Paperwhite Gen 12 16GB',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Latest Kindle Paperwhite with 6.8-inch glare-free display, adjustable warm light, and waterproof design.',
    category: 'Entertainment',
    stock: 32,
    rating: 4.8,
    reviews: 892
  },

  // ========== NETWORKING ==========
  {
    id: 'nw001',
    name: 'TP-Link M7000',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1750711731797-25c3f2551ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '4G LTE mobile Wi-Fi hotspot, supports up to 10 devices, 2000mAh battery for 8 hours use.',
    category: 'Networking',
    stock: 40,
    rating: 4.3,
    reviews: 156
  },
  {
    id: 'nw002',
    name: 'TP-Link M7200',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1750711731797-25c3f2551ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Advanced 4G LTE mobile Wi-Fi with faster speeds, supports 10 devices simultaneously.',
    category: 'Networking',
    stock: 35,
    rating: 4.4,
    reviews: 134
  },
  {
    id: 'nw003',
    name: 'TP-Link 850RE',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1554098415-4052459dc340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Wi-Fi range extender AC850, dual band, extends coverage up to 1200 sq ft.',
    category: 'Networking',
    stock: 60,
    rating: 4.2,
    reviews: 245
  },
  {
    id: 'nw004',
    name: 'TP-Link RE200',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1554098415-4052459dc340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC750 Wi-Fi range extender with dual external antennas for better signal strength.',
    category: 'Networking',
    stock: 55,
    rating: 4.3,
    reviews: 298
  },
  {
    id: 'nw005',
    name: 'TP-Link Deco X10',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AX1500 Whole Home Mesh Wi-Fi 6 system, covers up to 3800 sq ft, supports 150+ devices.',
    category: 'Networking',
    stock: 12,
    rating: 4.7,
    reviews: 187
  },
  {
    id: 'nw006',
    name: 'TP-Link Deco P9',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Hybrid mesh Wi-Fi system with powerline backhaul for dead zone elimination.',
    category: 'Networking',
    stock: 10,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'nw007',
    name: 'TP-Link Deco M4',
    price: 13800,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1200 Whole Home Mesh Wi-Fi system, seamless roaming, parental controls, 3-pack.',
    category: 'Networking',
    stock: 18,
    rating: 4.5,
    reviews: 312
  },
  {
    id: 'nw008',
    name: 'TP-Link Tapo L530E (4pcs)',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Smart Wi-Fi LED bulbs multicolor pack, voice control compatible with Alexa and Google.',
    category: 'Networking',
    stock: 45,
    rating: 4.4,
    reviews: 267
  },
  {
    id: 'nw009',
    name: 'TP-Link TL WR841N',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1554098415-4052459dc340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '300Mbps wireless N router with 2 antennas, perfect for small homes and offices.',
    category: 'Networking',
    stock: 70,
    rating: 4.1,
    reviews: 456
  },
  {
    id: 'nw010',
    name: 'TP-Link TL WPA7517 KIT',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AV1000 Gigabit Powerline Wi-Fi Kit, extends internet via electrical wiring.',
    category: 'Networking',
    stock: 22,
    rating: 4.4,
    reviews: 134
  },
  {
    id: 'nw011',
    name: 'TP-Link Archer UE300',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'USB 3.0 to Gigabit Ethernet network adapter for fast wired connection.',
    category: 'Networking',
    stock: 85,
    rating: 4.3,
    reviews: 189
  },
  {
    id: 'nw012',
    name: 'TP-Link Archer T4U',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1300 dual-band wireless USB adapter for desktop and laptop Wi-Fi upgrade.',
    category: 'Networking',
    stock: 65,
    rating: 4.4,
    reviews: 223
  },
  {
    id: 'nw013',
    name: 'TP-Link Archer T2U Nano',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC600 nano wireless USB adapter, compact design, plug and play.',
    category: 'Networking',
    stock: 90,
    rating: 4.2,
    reviews: 345
  },
  {
    id: 'nw014',
    name: 'TP-Link Archer T2U',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC600 dual-band wireless USB adapter with external antenna for better range.',
    category: 'Networking',
    stock: 75,
    rating: 4.3,
    reviews: 267
  },
  {
    id: 'nw015',
    name: 'TP-Link Archer T3U Nano',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1300 mini wireless MU-MIMO USB adapter, ultra-compact for laptops.',
    category: 'Networking',
    stock: 80,
    rating: 4.3,
    reviews: 198
  },
  {
    id: 'nw016',
    name: 'TP-Link Archer T3U',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1300 dual-band wireless USB adapter with MU-MIMO technology.',
    category: 'Networking',
    stock: 68,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'nw017',
    name: 'TP-Link Archer C86',
    price: 4700,
    image: 'https://images.unsplash.com/photo-1554098415-4052459dc340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1900 dual-band Wi-Fi router with MU-MIMO, beamforming, 4 antennas.',
    category: 'Networking',
    stock: 28,
    rating: 4.5,
    reviews: 289
  },
  {
    id: 'nw018',
    name: 'TP-Link MR100',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1750711731797-25c3f2551ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '300Mbps 4G LTE wireless router with SIM card slot for plug-and-play connectivity.',
    category: 'Networking',
    stock: 24,
    rating: 4.4,
    reviews: 167
  },
  {
    id: 'nw019',
    name: 'TP-Link UB400',
    price: 800,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Nano USB Bluetooth 4.0 adapter for PC, plug and play, compatible with Windows.',
    category: 'Networking',
    stock: 120,
    rating: 4.2,
    reviews: 412
  },
  {
    id: 'nw020',
    name: 'TP-Link UH700',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '7-port USB 3.0 hub with 12V power adapter for charging and data transfer.',
    category: 'Networking',
    stock: 35,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'nw021',
    name: 'TP-Link TL WN725N',
    price: 660,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '150Mbps wireless nano USB adapter, ultra-compact design for laptops.',
    category: 'Networking',
    stock: 150,
    rating: 4.0,
    reviews: 567
  },
  {
    id: 'nw022',
    name: 'TP-Link TL WN823N',
    price: 1050,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '300Mbps mini wireless N USB adapter with SoftAP mode.',
    category: 'Networking',
    stock: 95,
    rating: 4.1,
    reviews: 334
  },
  {
    id: 'nw023',
    name: 'TP-Link TL SG1016D',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1629367490572-e5c5ebae4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '16-port Gigabit desktop/rackmount switch, unmanaged plug and play.',
    category: 'Networking',
    stock: 15,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'nw024',
    name: 'TP-Link TL SG1008D',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1629367490572-e5c5ebae4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '8-port Gigabit desktop switch with metal casing and energy-efficient technology.',
    category: 'Networking',
    stock: 48,
    rating: 4.5,
    reviews: 456
  },
  {
    id: 'nw025',
    name: 'TP-Link SG3428',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1629367490572-e5c5ebae4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '28-port Gigabit managed switch with 4 SFP slots for enterprise networking.',
    category: 'Networking',
    stock: 8,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'nw026',
    name: 'TP-Link EAP610',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AX1800 ceiling mount Wi-Fi 6 access point for business, supports 1200+ clients.',
    category: 'Networking',
    stock: 12,
    rating: 4.8,
    reviews: 134
  },
  {
    id: 'nw027',
    name: 'TP-Link EAP225',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1350 dual-band ceiling mount access point with seamless roaming and MU-MIMO.',
    category: 'Networking',
    stock: 18,
    rating: 4.6,
    reviews: 267
  },
  {
    id: 'nw028',
    name: 'TP-Link EAP115',
    price: 3700,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '300Mbps wireless N ceiling mount access point, PoE supported.',
    category: 'Networking',
    stock: 30,
    rating: 4.3,
    reviews: 198
  },
  {
    id: 'nw029',
    name: 'TP-Link EAP245',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'AC1750 wireless dual-band Gigabit ceiling mount access point.',
    category: 'Networking',
    stock: 20,
    rating: 4.5,
    reviews: 223
  },
  {
    id: 'nw030',
    name: 'TP-Link CPE210',
    price: 3700,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '2.4GHz 300Mbps outdoor CPE for point-to-point long distance wireless transmission.',
    category: 'Networking',
    stock: 25,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'nw031',
    name: 'TP-Link LS1005G',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1629367490572-e5c5ebae4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '5-port Gigabit desktop switch, compact and energy-efficient.',
    category: 'Networking',
    stock: 72,
    rating: 4.4,
    reviews: 389
  },
  {
    id: 'nw032',
    name: 'TP-Link TL SF1005P',
    price: 3700,
    image: 'https://images.unsplash.com/photo-1629367490572-e5c5ebae4bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '5-port 10/100Mbps desktop switch with 4 PoE ports for IP cameras.',
    category: 'Networking',
    stock: 32,
    rating: 4.5,
    reviews: 267
  },

  // ========== SOLAR ENERGY ==========
  {
    id: 'sl001',
    name: '100W Solar Panel Kit',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1726221062287-fda475b85493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Complete 100W monocrystalline solar panel kit with charge controller and cables.',
    category: 'Solar Energy',
    stock: 35,
    rating: 4.5,
    reviews: 123
  },
  {
    id: 'sl002',
    name: '200W Solar Panel Kit',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1726221062287-fda475b85493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '200W solar panel system perfect for small homes and cabins, includes mounting hardware.',
    category: 'Solar Energy',
    stock: 28,
    rating: 4.6,
    reviews: 98
  },
  {
    id: 'sl003',
    name: '500W Solar Panel System',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1726221062287-fda475b85493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '500W complete solar power system with panels, inverter, and battery ready setup.',
    category: 'Solar Energy',
    stock: 18,
    rating: 4.7,
    reviews: 76
  },
  {
    id: 'sl004',
    name: '1KW Home Solar System',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1626077641207-54883482bb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Professional 1KW off-grid solar system for entire home power backup and independence.',
    category: 'Solar Energy',
    stock: 12,
    rating: 4.8,
    reviews: 54
  },
  {
    id: 'sl005',
    name: 'Solar Inverter 2KVA',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1626077641207-54883482bb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Pure sine wave solar inverter 2000VA with MPPT charge controller built-in.',
    category: 'Solar Energy',
    stock: 20,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'sl006',
    name: 'Solar Inverter 5KVA',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1626077641207-54883482bb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'High capacity 5KVA solar inverter for larger homes and small businesses.',
    category: 'Solar Energy',
    stock: 10,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'sl007',
    name: 'Solar Battery 100AH',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1608454835214-9322782f60d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Deep cycle 12V 100AH solar battery optimized for solar energy storage.',
    category: 'Solar Energy',
    stock: 40,
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'sl008',
    name: 'Solar Battery 200AH',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1608454835214-9322782f60d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'High capacity 12V 200AH deep cycle battery for extended solar power backup.',
    category: 'Solar Energy',
    stock: 25,
    rating: 4.6,
    reviews: 112
  },
  {
    id: 'sl009',
    name: 'Solar Charge Controller 20A',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'MPPT solar charge controller 20A with LCD display and USB charging ports.',
    category: 'Solar Energy',
    stock: 55,
    rating: 4.4,
    reviews: 198
  },
  {
    id: 'sl010',
    name: 'Solar Charge Controller 40A',
    price: 7800,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Advanced 40A MPPT charge controller with Bluetooth monitoring and app control.',
    category: 'Solar Energy',
    stock: 32,
    rating: 4.7,
    reviews: 145
  },
  {
    id: 'sl011',
    name: 'Solar Water Heater 100L',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1585129777864-40dab58c3f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Evacuated tube solar water heater 100 liters with electric backup element.',
    category: 'Solar Energy',
    stock: 8,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 'sl012',
    name: 'Solar Water Heater 200L',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1585129777864-40dab58c3f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Large capacity 200L solar water heating system for families and guesthouses.',
    category: 'Solar Energy',
    stock: 5,
    rating: 4.8,
    reviews: 43
  },
  {
    id: 'sl013',
    name: 'Solar Street Light',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'All-in-one solar LED street light with motion sensor and dusk-to-dawn operation.',
    category: 'Solar Energy',
    stock: 45,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'sl014',
    name: 'Solar Flood Light',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'High brightness solar flood light with remote control and timer function.',
    category: 'Solar Energy',
    stock: 60,
    rating: 4.4,
    reviews: 189
  },
  {
    id: 'sl015',
    name: 'Solar Home Lighting Kit',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Complete solar home lighting kit with 4 LED bulbs, USB charging, and FM radio.',
    category: 'Solar Energy',
    stock: 38,
    rating: 4.5,
    reviews: 267
  },

  // ========== MACHINERY ==========
  {
    id: 'mc001',
    name: 'Industrial Generator 5KVA',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1738918921961-72d2f3f6509e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Heavy-duty 5KVA diesel generator with electric start and automatic voltage regulator.',
    category: 'Machinery',
    stock: 6,
    rating: 4.7,
    reviews: 45
  },
  {
    id: 'mc002',
    name: 'Industrial Generator 10KVA',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1738918921961-72d2f3f6509e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Professional 10KVA diesel generator for industrial and commercial applications.',
    category: 'Machinery',
    stock: 4,
    rating: 4.8,
    reviews: 32
  },
  {
    id: 'mc003',
    name: 'Concrete Mixer 500L',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Electric concrete mixer 500 liters capacity with sturdy steel drum and wheels.',
    category: 'Machinery',
    stock: 8,
    rating: 4.6,
    reviews: 56
  },
  {
    id: 'mc004',
    name: 'Concrete Mixer 1000L',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Large capacity 1000L concrete mixer for heavy construction projects.',
    category: 'Machinery',
    stock: 3,
    rating: 4.7,
    reviews: 28
  },
  {
    id: 'mc005',
    name: 'Electric Drill Machine',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1770763233593-74dfd0da7bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Professional electric drill 13mm with hammer function and variable speed control.',
    category: 'Machinery',
    stock: 35,
    rating: 4.5,
    reviews: 178
  },
  {
    id: 'mc006',
    name: 'Angle Grinder',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '9-inch angle grinder 2000W with safety guard and auxiliary handle.',
    category: 'Machinery',
    stock: 42,
    rating: 4.4,
    reviews: 234
  },
  {
    id: 'mc007',
    name: 'Circular Saw',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1563821064458-efef27fc07e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Heavy-duty circular saw 185mm with laser guide and depth adjustment.',
    category: 'Machinery',
    stock: 22,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'mc008',
    name: 'Jack Hammer',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Electric demolition jack hammer 1800W with pointed and flat chisels.',
    category: 'Machinery',
    stock: 12,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 'mc009',
    name: 'Water Pump 1HP',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Centrifugal water pump 1HP for irrigation and water transfer applications.',
    category: 'Machinery',
    stock: 28,
    rating: 4.5,
    reviews: 156
  },
  {
    id: 'mc010',
    name: 'Water Pump 2HP',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'High-flow 2HP water pump with thermal overload protection.',
    category: 'Machinery',
    stock: 18,
    rating: 4.6,
    reviews: 98
  },
  {
    id: 'mc011',
    name: 'Air Compressor 50L',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '50-liter air compressor with oil-free pump and pressure gauge.',
    category: 'Machinery',
    stock: 15,
    rating: 4.5,
    reviews: 123
  },
  {
    id: 'mc012',
    name: 'Air Compressor 100L',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Industrial 100L air compressor for heavy-duty pneumatic tools.',
    category: 'Machinery',
    stock: 9,
    rating: 4.7,
    reviews: 76
  },
  {
    id: 'mc013',
    name: 'Welding Machine',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1764245546004-e6b743242a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Inverter welding machine 200A with digital display and accessories.',
    category: 'Machinery',
    stock: 20,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'mc014',
    name: 'Power Trowel',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Gasoline power trowel for concrete finishing with adjustable blade pitch.',
    category: 'Machinery',
    stock: 5,
    rating: 4.8,
    reviews: 43
  },
  {
    id: 'mc015',
    name: 'Vibrating Plate Compactor',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Heavy-duty vibrating plate compactor for soil and asphalt compaction.',
    category: 'Machinery',
    stock: 7,
    rating: 4.7,
    reviews: 54
  }
];

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: 'mpesa' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      { productId: 'gm001', quantity: 1, price: 103000, name: 'PS5 Pro' },
      { productId: 'gm018', quantity: 1, price: 23000, name: 'PS5 Elite Headset' }
    ],
    total: 126000,
    status: 'delivered',
    createdAt: '2024-02-15T10:30:00Z',
    shippingAddress: {
      name: 'John Mwangi',
      phone: '+254700123456',
      address: '45 Kenyatta Avenue',
      city: 'Nairobi'
    },
    paymentMethod: 'mpesa',
    paymentStatus: 'paid'
  },
  {
    id: '2',
    userId: '2',
    items: [
      { productId: 'nw005', quantity: 1, price: 20000, name: 'TP-Link Deco X10' },
      { productId: 'en002', quantity: 2, price: 7500, name: 'Fire Stick 4K' }
    ],
    total: 35000,
    status: 'shipped',
    createdAt: '2024-03-01T14:15:00Z',
    shippingAddress: {
      name: 'John Mwangi',
      phone: '+254700123456',
      address: '45 Kenyatta Avenue',
      city: 'Nairobi'
    },
    paymentMethod: 'mpesa',
    paymentStatus: 'paid'
  },
  {
    id: '3',
    userId: '1',
    items: [
      { productId: 'sl004', quantity: 1, price: 85000, name: '1KW Home Solar System' }
    ],
    total: 85000,
    status: 'processing',
    createdAt: '2024-03-05T09:45:00Z',
    shippingAddress: {
      name: 'Admin User',
      phone: '+254711222333',
      address: 'Westlands Shopping Center',
      city: 'Nairobi'
    },
    paymentMethod: 'mpesa',
    paymentStatus: 'paid'
  }
];

export const categories = [
  'Gaming',
  'Entertainment',
  'Networking',
  'Solar Energy',
  'Machinery'
];

export const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', description: 'Pay with your M-Pesa account' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Pay with Visa, MasterCard, or other cards' }
];
