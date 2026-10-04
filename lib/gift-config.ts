/**
 * Edit everything about the gift here: names, photos, messages and music.
 * Photos live in /public/photos and the song in /public/audio — swap the
 * files or point these paths at any image / audio URL.
 */

export type GiftPhoto = {
  src: string
  alt: string
  caption: string
}

export type BookPage = {
  photo: GiftPhoto | GiftPhoto[]
  title: string
  message: string
  date?: string
}

export const GIFT_CONFIG = {
  recipientName: 'Elsa',
  senderName: 'Yours, always',

  music: {
    src: '/audio/birthday-music-box.mp3',
    title: 'Happy Birthday — music box',
    volume: 0.55,
  },

  splash: {
    loadingText: 'Preparing something special for you...',
    buttonText: 'Open Gift 💖',
    durationMs: 3200,
  },

  photoWall: {
    heading: 'Every little moment with you',
    buttonText: 'Enter My Room ✨',
    hint: 'Tap anywhere to continue',
  },

  room: {
    tooltip: 'Click to open book 📖',
    bookLabel: 'Our Memories',
  },

  book: {
    coverTitle: 'Happy Birthday My Love 🎂',
    coverSubtitle: 'A little book of us',
    endTitle: 'Happy Birthday, my love',
    endMessage:
      'Here is to another year of laughing at nothing, getting lost on purpose, and choosing each other every single day. I love you more than all the pages in the world could hold.',
  },
}

export const PHOTOS: GiftPhoto[] = [
  { src: '/photos/poto1.jpg', alt: 'Us laughing on the beach at golden hour', caption: 'Kiara Artha day' },
  { src: '/photos/poto2.jpg', alt: 'Holding hands over two coffee cups', caption: 'Taman Dewata Valley' },
  { src: '/photos/poto3.jpg', alt: 'Watching the city lights at night', caption: 'Curug Cinulang Nature' },
  { src: '/photos/poto4.jpg', alt: 'Birthday cake with glowing candles', caption: 'Senandung Sore Coffee' },
  { src: '/photos/poto5.jpg', alt: 'Walking hand in hand through autumn leaves', caption: 'Vitamin Tree & Lake Situ Salawé' },
  { src: '/photos/poto6.jpg', alt: 'Pink roses and a love letter on the bed', caption: 'Anniversary Bandung Of Sumaba' },
]

export const BOOK_PAGES: BookPage[] = [
  {
    photo: [
      { src: '/photos/story1-label1.jpg', alt: 'Deskripsi foto 1', caption: 'Masih inget ini?' },
      { src: '/photos/story1-label2.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story1-label3.jpg', alt: 'Deskripsi foto 3', caption: 'Makan mulu' }
    ],
    title: 'Where it all began',
    date: 'May 31 — June 7',
    message:
      'It all started with a simple effort to reconnect with you after so long. Siapa sangka, tanggal 6 Juni jadi hari pertama kita duduk bersama di Bedeng Hills. Kita masih sama-sama malu-malu, tapi suasana hangat itu mencair begitu saja. Dan tepat keesokan harinya, first video call kita bikin aku sadar—aku ingin terus mendengar suaramu setiap hari. That was truly the sweetest beginning of us.',
  },
  {
    photo: [
      { src: '/photos/story2-label1.jpg', alt: 'Deskripsi foto 1', caption: 'Masih inget ini?' },
      { src: '/photos/story2-label2.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story2-label3.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story2-label4.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story2-label5.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' }
    ],
    title: 'The Day We Became Us',
    date: 'June 16 — June 30',
    message:
      'Pertemuan ke 2 Days of exploring Bandung and Kiara Artha Park seharian kita jadi penjelajah di bandung, sampai ke Juni tanggal 28 kita bertemu kembali untuk melakukan banyak hal seperti makan di Gacoan, nonton movie, makan es krim bersama sampai satu per satu ceklist kamu terkabulkan. malamnya sepulang dari sana aku terus menyatakan perasaan sama kamu, and officially, you became mine 🥰. Dua hari kemudian aku di ajak berkunjung ke rumah kamu, aku punya sedikit trust issue tapi keraguan masa laluku langsung sirna saat keluarga kamu menyambut aku dengan begitu hangat. I knew right then, you are my safe place.',
  },
  {
    photo: [
      { src: '/photos/story3-label1.jpg', alt: 'Deskripsi foto 1', caption: 'Masih inget ini?' },
      { src: '/photos/story3-label2.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story3-label3.jpg', alt: 'Deskripsi foto 3', caption: 'Makan mulu' },
      { src: '/photos/story3-label4.jpg', alt: 'Deskripsi foto 4', caption: 'Makan mulu' },
      { src: '/photos/story3-label5.PNG', alt: 'Deskripsi foto 5', caption: 'Makan mulu' },
      { src: '/photos/story3-label6.jpg', alt: 'Deskripsi foto 6', caption: 'Makan mulu' },
      { src: '/photos/story3-label7.jpg', alt: 'Deskripsi foto 7', caption: 'Makan mulu' },
      { src: '/photos/story3-label8.jpg', alt: 'Deskripsi foto 8', caption: 'Makan mulu' },
      { src: '/photos/story3-label9.jpg', alt: 'Deskripsi foto 9', caption: 'Makan mulu' },
      { src: '/photos/story3-label10.jpg', alt: 'Deskripsi foto 10', caption: 'Makan mulu' }
    ],
    title: 'Lembang & August Memories',
    date: 'July 23 — August 25',
    message:
      'Every trip with you always feels magical. Dari momen kamu yang sempat grogi pas aku jemput pulang kerja, jalan-jalan seru di Lembang Taman Dewata dan Braga, hingga bulan Agustus yang penuh cerita. Paling berkesan waktu ortuku ikut main ke Bandung dan kamu akhirnya ketemu langsung dengan mereka (walaupun aku sempat diledekin ortu sendiri!). Dilanjut petualangan kita ke Curug Cinulang, mampir ke cafe Senandung Sore, dan ngopi di mobil van pinggir bukit. With you, even a simple day turns into a core memory.',
  },
  {
    photo: [
      { src: '/photos/story4-label1.jpg', alt: 'Deskripsi foto 1', caption: 'Masih inget ini?' },
      { src: '/photos/story4-label2.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story4-label3.jpg', alt: 'Deskripsi foto 3', caption: 'Makan mulu' },
      { src: '/photos/story4-label4.jpg', alt: 'Deskripsi foto 4', caption: 'Makan mulu' },
      { src: '/photos/story4-label5.jpg', alt: 'Deskripsi foto 5', caption: 'Makan mulu' },
      { src: '/photos/story4-label6.jpg', alt: 'Deskripsi foto 6', caption: 'Makan mulu' }
    ],
    title: 'Garut Grilling & Rainy Nights',
    date: 'August 29 — September 26',
    message:
      'Time spent with you brings absolute peace. Agenda berikutnya kita nge-grill bareng di Situ Salawé Garut, biarpun ada sedikit drama karpetnya sempat bolong kena panas panggangan, but it was hilarious and so cozy! Puncaknya waktu merayakan ulang tahunku di rumahmu, dan tanggal 26 kita datang ke malam perayaan anniversary Bandung di Summarecon Mall. walapun sempat hujan di sana, tapi kita masih bisa jajan makanan jadul sepuasnya, itu malam yang sangat indah walaupun kita jadi pulang larut malam, untung aku udah sogok roti bakar hehe..',
  },
  {
    photo: [
      { src: '/photos/story5-label1.jpg', alt: 'Deskripsi foto 1', caption: 'Masih inget ini?' },
      { src: '/photos/story5-label2.jpg', alt: 'Deskripsi foto 2', caption: 'Makan mulu' },
      { src: '/photos/story5-label3.jpg', alt: 'Deskripsi foto 3', caption: 'Makan mulu' },
      { src: '/photos/story5-label4.jpg', alt: 'Deskripsi foto 4', caption: 'Makan mulu' },
      { src: '/photos/story5-label5.jpg', alt: 'Deskripsi foto 5', caption: 'Makan mulu' },
      { src: '/photos/story5-label6.jpg', alt: 'Deskripsi foto 6', caption: 'Makan mulu' },
      { src: '/photos/story5-label7.jpg', alt: 'Deskripsi foto 7', caption: 'Makan mulu' },
      { src: '/photos/story5-label8.jpg', alt: 'Deskripsi foto 8', caption: 'Makan mulu' },
      { src: '/photos/story5-label9.jpg', alt: 'Deskripsi foto 9', caption: 'Makan mulu' },
      { src: '/photos/story5-label10.jpg', alt: 'Deskripsi foto 10', caption: 'Makan mulu' }
    ],
    title: 'Our Forever Chapter',
    date: 'Today & Forever',
    message:
      'Looking back at every single date we carved together, aku sadar perjalanan kita nggak selalu sempurna, tapi justru hal-hal kecil itulah yang bikin kita makin kuat. Thank you for staying, for loving me, and for being the best part of my days. Perjalanan lembaran buku ini memang ada batasnya, but our real story is just getting started. I love you, always❤️',
  },
]