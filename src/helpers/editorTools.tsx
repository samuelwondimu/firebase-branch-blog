// import { uploadImage } from "../../services/firebase";
const Header = require("@editorjs/header");
const Embed = require("@editorjs/embed");
const Image = require("@editorjs/image");
const List = require("@editorjs/list");
const Delimiter = require("@editorjs/delimiter");
const Link = require("@editorjs/link");
const Quote = require("@editorjs/quote");
const Table = require("@editorjs/table");
const Underline = require("@editorjs/underline");
const Personality = require("@editorjs/personality");

export const Editor_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        telegram: true,
      },
    },
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    inlineToolbar: true,
    config: {
      uploader: {
        //   uploadImage(file: any).then((downloadUrl: any) => {
        //     resolve({
        //       success: true,
        //       file: {
        //         url: `${downloadUrl}`,
        //       }
        //     })
        //   }).catch((error: any) => {
        //     console.log(error);
        //     resolve({
        //       success: false,
        //       error: error
        //     })
        //   })
        // }
      },
    },
    list: List,
    qoute: Quote,
    link: {
      class: Link,
      inlineToolbar: true,
    },
    table: Table,
    underline: Underline,
    personality: {
      class: Personality,
      inlineToolbar: true,
      config: {
        uploader: {
          //
        },
      },
    },
  },
};
