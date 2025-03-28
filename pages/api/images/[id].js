export default function handler(req, res) {
  const { id } = req.query
  const images = {
    1: {
      id: 1,
      title: '시현하다 1',
      description: '당신의 특별한 순간을 담은 사진',
      url: 'https://picsum.photos/800/600?random=1'
    },
    2: {
      id: 2,
      title: '시현하다 2',
      description: '아름다운 추억을 남기는 순간',
      url: 'https://picsum.photos/800/600?random=2'
    },
    3: {
      id: 3,
      title: '시현하다 3',
      description: '소중한 기억을 담은 사진',
      url: 'https://picsum.photos/800/600?random=3'
    }
  }

  const image = images[id]
  if (!image) {
    return res.status(404).json({ message: '이미지를 찾을 수 없습니다.' })
  }

  res.status(200).json(image)
} 