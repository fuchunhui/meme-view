<script setup lang="ts">

// 响应button事件
// drop区域增加图标提示
// drop事件
// 拷贝响应
// 图片格式检查

const fileChange = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files;
  if (!fileList || fileList.length < 1) {
    return false;
  }

  handleFile(fileList[0]);
};

const dragenter = (event: DragEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

const dragover = (event: DragEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

const fileDrop = (event: DragEvent) => {
  event.stopPropagation();
  event.preventDefault();

  const fileList = (event.dataTransfer as DataTransfer).files;
  if (fileList.length > 1) {
    toast('不支持多个文件同时操作，请仅拖放单个文件');
    return false;
  }

  handleFile(fileList[0]);
};

const filePaste = (event: ClipboardEvent) => {
  event.stopPropagation();
  event.preventDefault();

  const fileList = (event.clipboardData as DataTransfer).files;
  console.log(fileList);
  if (fileList.length > 1) {
    toast('不支持多个文件同时操作，请仅拖放单个文件');
    return false;
  }
  handleFile(fileList[0]);
};

const MAX_SIZE = 2 * 1024 * 1024;

const handleFile = (file: File) => {
  console.log('file: ', file);

  const {name, size, type} = file;
  const imageType = /^image\//;
  if (!imageType.test(type)) {
    toast(`当前文件类型为${type}，类型不符，请选择图片类型！`);
    return false;
  }

  if (size > MAX_SIZE) {
    toast('文件超过最大限制2M，请重新选择');
    return false;
  }

  const reader = new FileReader();
  reader.onload = (event: Event) => {
    const base64 = (event.target as FileReader).result as string;
    handleImage(base64, name);
  };
  reader.onerror = () => {
    toast((reader.error as DOMException).message);
  };
  reader.readAsDataURL(file);
};

const toast = (msg: string) => {
  alert(msg);
};

const handleImage = (base64: string, name: string) => {
  console.log(name, base64);
};
</script>

<template>
  <div class="meme-file-upload">
    <div class="file-button">
      <i class="file-glyphicon"/>
      <span>UPLOAD FILE</span>
      <input class="file-input" type="file" name="file" accept="image/*" @change="fileChange">
    </div>
    <div
      class="file-area"
      :draggable="true"
      :contenteditable="true"
      @dragenter="dragenter"
      @dragover="dragover"
      @drop="fileDrop"
      @paste="filePaste"
    >
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
    border: thin dotted;
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