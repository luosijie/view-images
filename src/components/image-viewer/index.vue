<template>
    <transition name="fade" @after-leave="$emit('destroy')">
        <div class="image-viewer" v-show="visible">
            <div class="content">
                <div class="images-container" :style="{ transform: `translate(${current_ * -translateStep}%, 0)` }">
                    <div
                        class="image-item"
                        v-for="item in images_"
                        :key="item.url"
                        :style="{ transform: `rotate(${item.rotation}deg)` }"
                        @mousewheel.prevent="listeners.mousewheel"
                        @mouseup.prevent="listeners.mouseup"
                    >
                        <img
                            :src="item.url"
                            :style="{
                                width: `${item.width}px`,
                                marginLeft: `${item.marginLeft}px`,
                                marginTop: `${item.marginTop}px`
                            }"
                            @mousedown.prevent="listeners.mousedown"
                            @mousemove.prevent="listeners.mousemove"
                        />
                    </div>
                </div>
            </div>
            <div class="actions">
                <div class="top">
                    <span class="index">{{ current_ + 1 }}/{{ images_.length }}</span>
                </div>
                <div class="close" @click="tools.close">
                    <img src="./images/close.png"/>
                </div>
                <div class="item pre" @click="tools.pre">
                    <img src="./images/pre.png"/>
                </div>
                <div class="item next" @click="tools.next">
                    <img src="./images/next.png"/>
                </div>
                <div class="bottom">
                    <div class="item" @click="tools.zoomStep('in')">
                        <img src="./images/zoom-in.png"/>
                    </div>
                    <div class="item" @click="tools.zoomStep('out')">
                        <img src="./images/zoom-out.png"/>
                    </div>
                    <div class="item" @click="tools.scaleRestore">
                        <img src="./images/1-1.png"/>
                    </div>
                    <!-- <div class="item">
                        <img src="./images/play.png"/>
                    </div> -->
                    <div class="item" @click="tools.restore">
                        <img src="./images/refresh.png"/>
                    </div>
                    <div class="item" @click="tools.rotate(90)">
                        <img src="./images/rotate-left.png"/>
                    </div>
                    <div class="item"  @click="tools.rotate(-90)">
                        <img src="./images/rotate-right.png"/>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
    name: "ImageViewer",
    props: {
        type: {
            type: String,
            default: "",
        },
        urlKey: {
            type: String,
            default: "url",
        },
        current: {
            type: [String, Number],
            default: 0,
        },
        images: {
            type: Array,
            default() {
                return [
                    "http://img-arch.pconline.com.cn/images/upload/upc/tx/softbbs/1003/07/c0/3134443_1267900790753_1024x1024soft.jpg",
                    "http://img-arch.pconline.com.cn/images/upload/upc/tx/softbbs/1003/07/c0/3134443_1267900790753_1024x1024soft.jpg",
                    "http://img-arch.pconline.com.cn/images/upload/upc/tx/softbbs/1003/07/c0/3134443_1267900790753_1024x1024soft.jpg",
                ];
            },
        },
    },
    emits: ["destroy"],
    setup(props) {
        const translateStep = 100 / props.images.length;
        const visible = ref(false);

        // 当前显示的图片索引
        const current_ = ref(Number(props.current));
        const images_ = ref([]);
        const windowWidth = window.innerWidth;

        // 构造统一的images数据结构
        props.images.forEach((elem) => {
            const data = {
                originWidth: windowWidth / 2,
                scale: 1,
                width: windowWidth / 2,
                marginLeft: 0,
                marginTop: 0
            };
            // 图片路径统一放在数组对象 [{ url }] 中
            if (typeof elem === "string") {
                data.url = elem;
            } else {
                data.url = data[props.urlKey];
            }
            images_.value.push(data);
        });

        /**
         * 图片缩放
         * @param { Number } type 缩放类型 in:放大；out缩小
         * @param { Number } speed 缩放速度 默认 0.02
         */
        const zoom = (type, speed = 0.02) => {
            const image = images_.value[current_.value]
            const scale = image.scale;
            if (type === "in") {
                if (scale > 3) {
                    image.scale = 3;
                    return;
                }
                image.scale = Number((scale + speed).toFixed(2));
            } else if (type === "out") {
                if (scale < 0.3) {
                    image.scale = 0.3;
                    return;
                }
                image.scale = Number((scale - speed).toFixed(2));
            }
            image.width = image.scale * image.originWidth;
        };

        /**
         * 递增动画
         * @param { number } target 目标值
         * @param { object } image 作用对象
         * @param { string } key 作用对象-属性
         * @param { number } speed 速度
         * @param { function} fn 每次循环赋值后执行回调函数
         */
        const aniIncrease = ({ target, image, key, speed, max}, fn) => {
            const value = Number(image[key])
            if (value > target) {
                image[key] = target
                if (typeof fn === 'function') fn(image[key])
                return
            }

            image[key] += speed
            if (typeof fn === 'function') fn(image[key])

            requestAnimationFrame(() => {
                aniIncrease({ target, image, key, speed, max }, fn)
            })
        }

        /**
         * 递减动画
         * @param { number } target 目标值
         * @param { object } image 作用对象
         * @param { string } key 作用对象-属性
         * @param { number } speed 速度
         * @param { function} fn 每次循环赋值后执行回调函数
         */
        const aniDecrease = ({ target, image, key, speed }, fn) => {
            const value = Number(image[key])
            if (value < target) {
                image[key] = target
                if (typeof fn === 'function') fn(image[key])
                return
            }

            image[key] -= speed
            if (typeof fn === 'function') fn(image[key])
            
            requestAnimationFrame(() => {
                aniDecrease({ target, image, key, speed }, fn)
            })
        }

        /**
         * 放大到目标值
         * @param { number } target 目标值
         */
        const zoomInTo = target => {
            const key = 'scale'
            const speed = 0.03
            const image = images_.value[current_.value];
            aniIncrease({ target, image, key, speed }, value => {
                image.width = value * image.originWidth;
            })
        }

        /**
         * 缩小到目标值
         * @param { number } target 目标值
         */
        const zoomOutTo = target => {
            const key = 'scale'
            const speed = 0.03
            const image = images_.value[current_.value]
            aniDecrease({ target, image, key, speed }, value => {
                image.width = value * image.originWidth
            })
        }

        const positionRestore = () => {
            const image = images_.value[current_.value];
            console.log('image:', image.margintLeft, image.marginTop)
            const target = 0
            const speed = 10
            if (image.marginLeft > 0) aniDecrease({ target, image, key: 'marginLeft', speed })
            if (image.marginLeft < 0) aniIncrease({ target, image, key: 'marginLeft', speed })
            if (image.marginTop > 0) aniDecrease({ target, image, key: 'marginTop', speed })
            if (image.marginTop < 0) aniIncrease({ target, image, key: 'marginTop', speed })
        }

        /* 工具类方法 */
        const tools = {
            pre() {
                if (current_.value <= 0) return;
                tools.scaleRestore()
                tools.restore()
                current_.value--;
            },
            next() {
                if (current_.value >= images_.value.length - 1) return;
                tools.restore();
                current_.value++;
            },
            zoomStep(type) {
                const curImage = images_.value[current_.value];
                if (type === "in") {
                    let target = Number((curImage.scale + 0.5).toFixed(2));
                    zoomInTo(target)
                }
                if (type === "out") {
                    let target = Number((curImage.scale - 0.5).toFixed(2));
                    target = target < 0.3 ? 0.3 : target;
                    zoomOutTo(target)
                }
            },
            scaleRestore() {
                const curImage = images_.value[current_.value];
                if (curImage.scale > 1) zoomOutTo(1);
                if (curImage.scale < 1) zoomInTo(1);
            },
            rotate(deg) {
                const curImage = images_.value[current_.value];
                let rotation = curImage.rotation || 0;
                rotation += deg;
                curImage.rotation = rotation;
            },
            restore() {
                const curImage = images_.value[current_.value];
                curImage.rotation = 0;
                positionRestore()
                tools.scaleRestore()
            },
            close() {
                visible.value = false;
            }
        };

        const mouseStart = { marginLeft: 0, marginTop: 0, x: 0, y: 0 }
        let dragging = false

        // 图片元素绑定事件
        const listeners = {
            mousewheel(e) {
                if (e.wheelDelta > 0) zoom("in")
                if (e.wheelDelta < 0) zoom("out")
            },
            mousedown (e) {
                dragging = true
                const curImage = images_.value[current_.value]
                mouseStart.marginLeft = curImage.marginLeft
                mouseStart.marginTop = curImage.marginTop
                mouseStart.x = e.x
                mouseStart.y = e.y
            },
            mouseup () {
                dragging = false
            },
            mousemove (e) {
                if (!dragging) return
                const curImage = images_.value[current_.value]
                const deltaX = e.x - mouseStart.x
                const deltaY = e.y - mouseStart.y
                curImage.marginTop = mouseStart.marginTop + deltaY
                curImage.marginLeft = mouseStart.marginLeft + deltaX
            }
        };

        onMounted(() => {
            visible.value = true
        })

        return {
            translateStep,
            current_,
            images_,
            visible,
            tools,
            listeners,
        };
    }
};
</script>

<style scoped>
.image-viewer {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    user-select: none;
}
.actions > .top {
    position: absolute;
    left: 50%;
    width: 100px;
    text-align: center;
    color: #ffffff80;
    margin-top: 20px;
    margin-left: -50px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.actions > .close {
    position: absolute;
    right: -50px;
    top: -50px;
    width: 100px;
    height: 100px;
    background: #00000095;
    border-radius: 50%;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
}
.actions > .close img {
    position: absolute;
    bottom: 20px;
    left: 20px;
    cursor: crosshair;
}

.actions > .bottom {
    position: absolute;
    display: flex;
    width: 193px;
    margin: 0 auto;
    bottom: 30px;
    left: 50%;
    margin-left: -82px;
}
.actions > .bottom > .item:not(:last-child) {
    margin-right: 5px;
}
.item {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.item > img {
    text-align: center;
    vertical-align: middle;
    width: 14px;
    height: 14px;
}
.pre,
.next {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -40px;
}
.pre {
    left: 30px;
}
.next {
    right: 30px;
}
.image-item {
    width: 100vw;
    height: 100vh;
    padding: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    user-select: none;
    transition: transform 300ms ease-in-out;
}
.image-item img {
    width: 800px;
}

.content {
    position: relative;
}
.images-container {
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 500ms ease-in-out;
    display: flex;
}
/* transition */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
