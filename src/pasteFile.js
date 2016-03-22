
import fs from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
// import uuid from 'node-uuid'
// import mime from 'mime'

// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default function pasteFile(e) {
  // hack 一旦粘贴 滚至最底 错误的逻辑
  // $('#editor').scrollTop(1e9)

  e.preventDefault()
  //var clipboard = gui.Clipboard.get();
  //var text = clipboard.get('text');
  var items, item, types, i = 0;
  var clipboardData = (e.originalEvent || e).clipboardData;

  if (clipboardData) {
    items = clipboardData.items;

    if (!items) {
      return;
    }
    item = items[0];
    // var t = clipboardData.types;
    types = clipboardData.types || [];
    for (; i < types.length; i++) {
      if (types[i] === 'Files') {
        item = items[i];
        break;
      }
    }
    if (item && item.kind === 'file' && /^image\/|^(jpe?g|png|bmp|gif)$/.test(item.type)) {
      var blob = item.getAsFile()
      var reader = new FileReader()
      // var ext = mime.extension(item.type)
      var ext = item.type.match(/\/(.+)/)[1]
      var file = join(tmpdir(), `${uuid()}.${ext}`)
      // var url = URL.createObjectURL(blob)
      // richText.insertCapture(url);

      reader.onload = (e) => {
        if (!e.target.result) return
        fs.writeFile(file, e.target.result, 'binary', (err) => {
          if (err) return
          // richText.insertCapture('file://' + file);
          // global.editor.insertImage(`file:\/\/${file}`);
          // edit.insertImage(`file:\/\/${file}`);
          this.insertImage(`file:\/\/${file}`);

          // // 不知为何 企业qq复制的图片不能读取
          // if (!e.target.result) return

          // api.uploadFile(path,"img", (err,data) +> {
          //     var url = config.get("resurl")+"/api/fs/view/"+data.token+"?size=mini&token="+global.token;
          //     richText.insertCapture(url);
          // });
        });
        // $("#editor").focus();
      };
      reader.readAsBinaryString(blob);
    }
  }
}
