<template>
  <div class="title">
    <h1>Image Viewer</h1>
    <p>A images viewer plugin for Vue3</p>
  </div>
  <div class="images">
      <img
        v-for="(item, index) in images"
        :src="item"
        :key="index"
        @click="showImages(index)"
      />
  </div>
  <p style="color: #eee">Photos from Jesse Luo</p>
  <div class="usage">
    <h1>usage</h1>
    <pre>
      &lt;template&gt;
        &lt;div class="images"&gt;
          &lt;img
              :src="item"
              v-for="(item, index) in images"
              :key="index"
              @click="showImages(index)"
          /&gt;
        &lt;/div&gt;
      &lt;/template&gt;

      import ImageViewer from './ImageViewer'

      export default {
        setup () {

          const images = [
            './assets/01.jpeg',
            './assets/02.jpeg',
            './assets/03.jpeg',
            './assets/04.jpeg',
            './assets/05.jpeg',
          ]

          const showImages = index => {
            ImageViewer({ images, current: index })
          }

          return {
            showImages,
            images
          }

        }
      }
    </pre>
  </div>
</template>

<script>
import ImageViewer from './ImageViewer'
// import ImageViewer from '../docs/image-viewer.es'
import img_01 from './assets/01.jpeg'
import img_02 from './assets/02.jpeg'
import img_03 from './assets/03.jpeg'
import img_04 from './assets/04.jpeg'
import img_05 from './assets/05.jpeg'
export default {
  setup () {

    const images = [ img_01 , img_02, img_03, img_04, img_05 ]

    const showImages = index =>{
      ImageViewer({ images, current: index })
    }

    return {
      showImages,
      images
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.images {
  display: flex;
  justify-content: center;
}
.images > img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 5px;
  border-radius: 8px;
  cursor: pointer;
}
.usage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.usage > pre {
  background: #f8f8f8;
  border-radius: 8px;
  text-align: left;
  width: 600px;
  padding: 30px 0;
}
</style>
