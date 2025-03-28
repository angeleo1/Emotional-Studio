const https = require('https')
const fs = require('fs')
const path = require('path')

const images = [
  { name: 'hero1.jpg', url: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080' },
  { name: 'hero2.jpg', url: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080' },
  { name: 'gallery1.jpg', url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery2.jpg', url: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery3.jpg', url: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery4.jpg', url: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery5.jpg', url: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery6.jpg', url: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' },
  { name: 'gallery7.jpg', url: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800' }
]

const imagesDir = path.join(process.cwd(), 'public', 'images')

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath))
      } else {
        response.resume()
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`))
      }
    })

    request.on('error', reject)
  })
}

const downloadAllImages = async () => {
  try {
    for (const image of images) {
      const filepath = path.join(imagesDir, image.name)
      console.log(`Downloading ${image.name}...`)
      await downloadImage(image.url, filepath)
      console.log(`Downloaded ${image.name}`)
    }
    console.log('All images downloaded successfully!')
  } catch (error) {
    console.error('Error downloading images:', error)
  }
}

downloadAllImages() 