import appUrl from "../api/appUrl"

const linkAvatar = (avatar) => {
    return avatar.startsWith("http") ? avatar : appUrl.avatarURL + avatar;
};

export default linkAvatar;
