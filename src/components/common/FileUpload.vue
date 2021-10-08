<script setup lang="ts">

// 响应button事件
// drop区域增加图标提示
// drop事件
// 拷贝响应
// 图片格式检查
</script>

<template>
  <div class="meme-file-upload">
    <div class="file-button">
      <i class="file-glyphicon"/>
      <span>UPLOAD FILE</span>
      <input class="file-input" type="file" name="file">
    </div>
    <div class="file-area">
      <i class="file-tips">Drop files here to upload</i>
    </div>
  </div>
</template>

<style lang="less">
.meme-file-upload {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .file-button {
    position: relative;
    width: 140px;
    padding: 6px 12px;
    background-color: #5cb85c;
    border: 1px solid #4CAE4C;
    border-radius: 4px;
    color: #FFF;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }

  .file-glyphicon {
    display: inline-block;
    position: relative;
    top: -2px;
    right: 3px;
    transform: scale(1.3);
    &::before {
      content: "+";
    }
  }

  .file-input {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    height: 100%;
    background-image: none;
    opacity: 0;
    filter: alpha(opacity=0);
    direction: ltr;
    cursor: pointer;
  }
  .file-area {
    flex: 1;
    border: dotted;
    border-radius: 10px;
    margin: 10px 0;
    text-align: center;
    padding-top: 100px;
  }
  .file-tips {
    font-size: 20px;
    color: gray;
    font-style: italic;
  }
}
</style>