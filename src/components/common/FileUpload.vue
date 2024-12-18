<script setup lang="ts">
import {inject, type Ref} from 'vue';

const commands = inject('commands') as Ref<[string]>;
const emit = defineEmits(['change']);

const fileChange = (event: Event) => {
  const fileList = (event.target as HTMLInputElement).files;
  if (!fileList) {
    return false;
  }

  handleFiles(fileList);
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
  handleFiles(fileList);
};

const filePaste = (event: ClipboardEvent) => {
  event.stopPropagation();
  event.preventDefault();

  const fileList = (event.clipboardData as DataTransfer).files;
  handleFiles(fileList);
};

const MAX_SIZE = 1 * 1024 * 1024;
const IMAGE_TYPE = /^image\//;

const handleFiles = (fileList: FileList) => {
  if (fileList.length !== 1) {
    toast('不支持多个文件同时操作，请仅选择单个文件');
    return false;
  }
  
  const file = fileList[0];
  const {name, size, type} = file;

  if (!IMAGE_TYPE.test(type)) {
    toast(`当前文件类型为${type}，类型不符，请选择图片类型！`);
    return false;
  }

  const fileName = name.replace(/\.\w*$/g, '');
  if (commands.value.includes(fileName)) {
    toast(`当前文件名称【${name}】与系统默认关键指令【${fileName}】冲突，请重命名上传文件！`);
    return false;
  }

  if (size > MAX_SIZE) {
    toast('文件超过最大限制1M，请重新选择');
    return false;
  }

  const reader = new FileReader();
  reader.onload = (event: Event) => {
    const base64 = (event.target as FileReader).result as string;
    handleImage(name, base64);
  };
  reader.onerror = () => {
    toast((reader.error as DOMException).message);
  };
  reader.readAsDataURL(file);
};

const toast = (msg: string) => {
  alert(msg);
};

const handleImage = (name: string, base64: string) => {
  emit('change', {
    name,
    base64
  });
};
</script>

<template>
  <div class="meme-file-upload">
    <div class="file-button">
      <i class="file-glyphicon"/>
      <span>UPLOAD FILE</span>
      <input class="file-input" type="file" name="file" accept="image/*" title="" @change="fileChange">
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