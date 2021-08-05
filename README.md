# view-images
A images viewer for Vue3

### usage

```vue
<template>
  <div class="images">
    <img
        :src="item"
        v-for="(item, index) in images"
        :key="index"
        @click="viewImages(index)"
    />
  </div>
</template>

import view from 'view-images'
import 'view-images/dist/style.css'

export default {
  setup () {

    const images = [
      'https://../assets/01.jpeg',
      'https://../assets/02.jpeg',
      'https://../assets/03.jpeg',
      'https://../assets/04.jpeg',
      'https://../assets/05.jpeg',
    ]

    const viewImages = index => {
      view({ images, current: index })
    }

    return {
      viewImages,
      images
    }

  }
}
```
