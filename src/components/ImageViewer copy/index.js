import { createVNode } from '@vue/runtime-core'
import { render } from '@vue/runtime-dom'
import constructor from './index.vue'

const ImageViewer = (options = {}) => {
    const container = document.createElement('div')
    container.className = 'image-viewer-container'

    const vm = createVNode(
        constructor,
        options
    )
    
    vm.props.onDestroy = () => {
        render(null, container)
    }

    render(vm, container)
    document.body.appendChild(container.firstElementChild)

}

export default ImageViewer