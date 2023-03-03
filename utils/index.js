export const rules = {
  required(v) {
    return !!v || "Campo requerido";
  },
  email(v) {
    return (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "Correo no valido"
    );
  },
};

export const img2Base64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};

export const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
};

export const widthScreen = () => {
  const screens = {
    "mobile-xs": {
      minWidth: 0,
      maxWidth: 320,
    },
    "mobile-small": {
      minWidth: 320,
      maxWidth: 360,
    },
    "mobile-big": {
      minWidth: 360,
      maxWidth: 640,
    },
    tablet: {
      minWidth: 640,
      maxWidth: 769,
    },
    landscape: {
      minWidth: 769,
      maxWidth: 1024,
    },
    desktop: {
      minWidth: 1024,
      maxWidth: 1200,
    },
    "desktop-big": {
      maxWidth: 1200,
      maxWidth: 1440,
    },
  };
  const width = window.innerWidth;
  let screen = "";
  Object.keys(screens).forEach((key) => {
    if (screen) return;
    if (screens[key].minWidth < width && width <= screens[key].maxWidth)
      screen = key;
  });
  return screen;
};

export const getExtByMimeType = (mimeType) => {
  switch (mimeType) {
    case "image/gif":
      return "gif";
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    case "text/plain":
      return "txt";
    case "application/pdf":
      return "pdf";
    case "video/avi":
      return "avi";
    case "video/mp4":
      return "mp4";
    case "audio/mpeg":
      return "mp3";
    case "video/x-matroska":
      return "mkv";
    case "application/zip":
    case "application/x-zip-compressed":
    case "application/x-rar-compressed":
      return "zip";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "doc";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xls";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "ppt";
    default:
      "unknow";
  }
};
