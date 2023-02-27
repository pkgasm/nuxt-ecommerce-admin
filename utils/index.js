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
