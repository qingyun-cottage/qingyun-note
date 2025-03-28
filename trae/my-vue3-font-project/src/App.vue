<template>
    <div>
        <input type="file" @change="handleFileChange" accept=".ttf,.otf" />
        <input
            type="text"
            v-model="selectedCharacters"
            placeholder="Enter characters to include"
        />

        <div>
            <p>{{ selectedCharacters }}</p>
        </div>
        <button @click="generateSubsetFont">Generate Subset Font</button>
        <!-- 修改部分：添加对 URL 的检查 -->
        <a
            v-if="subsetFontBlob && typeof URL !== 'undefined'"
            :href="URL.createObjectURL(subsetFontBlob)"
            download="subset_font.ttf"
            >Download Subset Font</a
        >
    </div>
</template>

<script setup>
import { ref } from 'vue'
import opentype from 'opentype.js'

const file = ref(null)
const selectedCharacters = ref('')
const subsetFontBlob = ref(null)

const handleFileChange = e => {
    file.value = e.target.files[0]
    if (file.value) {
        const reader = new FileReader()
        reader.onload = event => {
            const arrayBuffer = event.target.result
            const font = opentype.parse(arrayBuffer)
            console.log(' font ', font)
            // 输出font的 familyName 和 styleName
            console.log(' familyName ', font.names.fontFamily.en)
            console.log(' styleName ', font.names.fontSubfamily.en)
        }
        reader.readAsArrayBuffer(file.value)
    }
}

const generateSubsetFont = async () => {
    if (!file.value || !selectedCharacters.value) return

    const reader = new FileReader()
    reader.onload = async event => {
        const arrayBuffer = event.target.result
        const font = await opentype.parse(arrayBuffer)

        // 检查字体是否加载成功
        if (!font) {
            console.error('Failed to load font')
            return
        }
        console.log(' font ', font)

        // 获取 .notdef 字形
        const notdefGlyph = font.charToGlyph('.notdef')
        const glyphs = [notdefGlyph]

        for (const char of selectedCharacters.value) {
            const glyph = font.charToGlyph(char)
            if (glyph) {
                glyphs.push(glyph)
            } else {
                console.error(`Failed to get glyph for character: ${char}`)
            }
        }

        // 检查 familyName 是否有效，若无效则提供默认值
        const familyName = font.names.fontFamily.en || 'fontFamily'
        // 检查 styleName 是否有效，若无效则提供默认值
        const styleName = font.names.fontSubfamily.en || 'fontSubfamily'

        const subsetFont = new opentype.Font({
            familyName: familyName,
            styleName: styleName,
            unitsPerEm: font.unitsPerEm,
            ascender: font.ascender,
            descender: font.descender,
            glyphs: glyphs,
        })

        const subsetFontBuffer = subsetFont.toArrayBuffer()
        subsetFontBlob.value = new Blob([subsetFontBuffer], {
            type: 'application/font-sfnt',
        })

        // 创建临时的 <a> 元素并触发下载
        const link = document.createElement('a')
        link.href = URL.createObjectURL(subsetFontBlob.value)
        // 修改部分：获取上传文件的文件名并添加压缩后缀
        const originalFileName = file.value.name.replace(/\.[^/.]+$/, '');
        link.download = `${originalFileName}_subset.ttf`;
        link.click()
        // 释放 URL 对象
        URL.revokeObjectURL(link.href)
    }

    reader.readAsArrayBuffer(file.value)
}
</script>

<style scoped>
/* You can add some styles here */
</style>
