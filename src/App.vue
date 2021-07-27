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

      import ImageViewer from './components/ImageViewer'

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
import ImageViewer from './components/ImageViewer'
// import ImageViewer from '../docs/image-viewer.es'

export default {
  setup () {

    const images = [
      './assets/01.jpeg',
      './assets/02.jpeg',
      './assets/03.jpeg',
      './assets/04.jpeg',
      './assets/05.jpeg',
    ]

    const showImages = index =>{
      ImageViewer({ images, current: index })
    }

    return {
      showImages,
      images
    }
  }
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
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
